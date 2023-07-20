import { useCallback, useState } from 'react';
import { useWindowListener } from '../hooks/useWindowListener';
import Word from './word';
import SpringBoard from './spring-board';

const spellCheckWord = async (currentWord: string[]) => {
  // TODO - hook up dictionary
  if (currentWord.includes('h')) {
    return false;
  }
  return true;
};

const Board: React.FC = () => {
  // initialize storedWords as stringified empty array
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';

  console.log('stored', storedWords);
  const submittedWords = JSON.parse(storedWords);

  console.log('stored', storedWords, 'submitted', submittedWords);
  const [currentWord, setCurrentWord] = useState<string[]>([]);

  const handleSubmitWord = useCallback(async () => {
    // TODO - spellcheck
    const isValidWord = await spellCheckWord(currentWord);
    if (isValidWord) {
      // TODO - kick off transition
      const stringified = JSON.stringify([...submittedWords, currentWord]);
      return localStorage.setItem('submittedWords', stringified);
    }
    // TODO - handle invalid word feedback
  }, [currentWord, submittedWords]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        const newWord = currentWord.slice(0, currentWord.length - 1);
        return setCurrentWord(newWord);
      }
      if (input === 'Enter') {
        return handleSubmitWord();
      }
    },
    [currentWord, handleSubmitWord]
  );

  // handle keyboard input, branch between whitespace and letter input
  const handleKeyboardInput = useCallback(
    (keyValue: string, keyCode: string) => {
      const isLetterInput = keyCode.includes('Key');
      // handle 'enter', 'delete', etc.
      if (!isLetterInput) {
        return handleWhiteSpaceInput(keyValue);
      }
      // add the letter to the array
      return setCurrentWord((currentWord) => currentWord.concat(keyValue));
    },
    [handleWhiteSpaceInput]
  );

  // listen for keyboard input
  useWindowListener('keyup', (e: Event) => {
    if (
      'code' in e &&
      'key' in e &&
      typeof e.code === 'string' &&
      typeof e.key === 'string'
    ) {
      const { code, key } = e;
      handleKeyboardInput(key, code);
    }
  });

  // TODO - "anchor tile"
  // first letter of submitted word is included in currentWord component by default
  // will make it easier to handle shake animation for invalid word feedback

  return (
    <div autoFocus={true} className="boardWrapper">
      <SpringBoard>
        {submittedWords.map((letters: string[], idx: number) => (
          <Word key={idx} letters={letters} />
        ))}
        <Word letters={currentWord} isCurrentWord={true} />
      </SpringBoard>
    </div>
  );
};

export default Board;
