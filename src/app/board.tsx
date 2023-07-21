import { useCallback, useState } from 'react';
import { useWindowListener } from '../hooks/useWindowListener';
import Word from './word';

interface BoardProps {
  submittedWords: string[][];
  rotateBoard: (wordCount: number) => void;
}

const spellCheckWord = async (currentWord: string[]) => {
  // TODO - hook up dictionary
  if (currentWord.length === 0 || currentWord.includes('h')) {
    return false;
  }
  return true;
};

const Board: React.FC<BoardProps> = (props) => {
  const { submittedWords, rotateBoard } = props;

  const [currentWord, setCurrentWord] = useState<string[]>([]);

  const handleSubmitWord = useCallback(async () => {
    // TODO - spellcheck
    const isValidWord = await spellCheckWord(currentWord);
    if (isValidWord) {
      const stringified = JSON.stringify([...submittedWords, currentWord]);
      localStorage.setItem('submittedWords', stringified);
      rotateBoard(submittedWords.length + 1);
    }
    // TODO - handle invalid word feedback
    return setCurrentWord([]);
  }, [currentWord, submittedWords, rotateBoard]);

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
      {submittedWords.map((letters: string[], idx: number) => (
        <Word key={idx} letters={letters} />
      ))}
      <Word letters={currentWord} isCurrentWord={true} />
    </div>
  );
};

export default Board;
