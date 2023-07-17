import { useCallback, useState } from 'react';
import { useWindowListener } from '../hooks/useWindowListener';
import CurrentWord from './current-word';

const Board: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string[]>([]);

  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        const newWord = currentWord.slice(0, currentWord.length - 1);
        return setCurrentWord(newWord);
      }
      if (input === 'Enter') {
        // TODO - persist word
        return console.log('guessed word');
      }
    },
    [currentWord]
  );

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

  useWindowListener('keyup', (e: Event) => {
    if (
      'code' in e &&
      'key' in e &&
      typeof e.code === 'string' &&
      typeof e.key === 'string'
    ) {
      const { code, key } = e;
      console.log('E', e);
      handleKeyboardInput(key, code);
    }
  });

  return (
    <div autoFocus={true}>
      <CurrentWord letters={currentWord} />
    </div>
  );
};

export default Board;
