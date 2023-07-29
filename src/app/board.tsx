import { styled } from '@stitches/react';
import { useCallback, useState } from 'react';
import CurrentWord from './current-word';
import SpringBoard from './spring-board';
import { useRotateBoard } from 'src/hooks/useRotateBoard';
import { useShakeWord } from 'src/hooks/useShakeWord';

const BoardContainer = styled('div', {
  height: '640px',
  width: '800px',
});

const spellCheckWord = async (currentWord: string[]) => {
  // TODO - hook up dictionary
  if (currentWord.length === 0 || currentWord.includes('h')) {
    return false;
  }
  return true;
};

// currentWord should start with first letter of last submittedWord
const determineFirstLetter = (submittedWords: string[][]) => {
  const lastSubmittedWord = submittedWords[submittedWords.length - 1];
  const letter =
    submittedWords.length <= 1
      ? lastSubmittedWord[0]
      : lastSubmittedWord[lastSubmittedWord.length - 1];
  return letter;
};

const Board: React.FC = () => {
  // keep board orientation in sync with submitted words
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] = JSON.parse(storedWords);

  const firstLetter = determineFirstLetter(submittedWords);
  const [currentWord, setCurrentWord] = useState<string[]>([firstLetter]);

  const { spring, rotateBoard } = useRotateBoard(submittedWords.length);
  const { shakeStyles, shakeWord } = useShakeWord();

  const handleSubmitWord = useCallback(async () => {
    // TODO - spellcheck
    const isValidWord = await spellCheckWord(currentWord);
    if (isValidWord) {
      const stringified = JSON.stringify([...submittedWords, currentWord]);
      localStorage.setItem('submittedWords', stringified);
      rotateBoard(submittedWords.length + 1);
      // next word should start with first letter of newly-submitted current word
      const firstLetter = determineFirstLetter([
        ...submittedWords,
        currentWord,
      ]);
      return setCurrentWord([firstLetter]);
    }
    shakeWord();
    const firstLetter = currentWord[0];
    return setCurrentWord([firstLetter]);
  }, [currentWord, submittedWords, rotateBoard, shakeWord]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        // anchor tile cannot be deleted
        const newWord =
          currentWord.length > 1
            ? currentWord.slice(0, currentWord.length - 1)
            : currentWord;
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

  return (
    <BoardContainer className="boardWrapper">
      <div autoFocus={true} className="boardWrapper">
        <SpringBoard submittedWords={submittedWords} spring={spring} />
      </div>
      <CurrentWord
        currentWord={currentWord}
        shakeStyles={shakeStyles}
        handleKeyboardInput={handleKeyboardInput}
      />
    </BoardContainer>
  );
};

export default Board;
