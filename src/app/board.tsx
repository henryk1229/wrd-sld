import { useCallback, useState } from 'react';
import { useWindowListener } from '../hooks/useWindowListener';
import Word from './word';

const Board: React.FC = () => {
  // initialize storedWords as stringified empty array
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';

  console.log('stored', storedWords);
  const submittedWords = JSON.parse(storedWords);

  console.log('stored', storedWords, 'submitted', submittedWords);
  const [currentWord, setCurrentWord] = useState<string[]>([]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        const newWord = currentWord.slice(0, currentWord.length - 1);
        return setCurrentWord(newWord);
      }
      if (input === 'Enter') {
        // TODO - spellcheck
        const stringified = JSON.stringify([...submittedWords, currentWord]);
        return localStorage.setItem('submittedWords', stringified);
      }
    },
    [currentWord, submittedWords]
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

  return (
    <div autoFocus={true}>
      {submittedWords.map((letters: string[], idx) => (
        <Word key={idx} letters={letters} />
      ))}
      <Word letters={currentWord} isCurrentWord={true} />
    </div>
  );
};

export default Board;
