import { styled } from '@stitches/react';
import { useCallback, useState } from 'react';
import CurrentWord from './current-word';
import SpringBoard from './spring-board';
import { useShakeWord } from '../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from './letters-bank';

const URL = 'http://localhost:3000/spellcheck';

const BoardContainer = styled('div', {
  height: '560px',
  width: '1000px',
});

const spellCheckWord = async (wordArray: string[]) => {
  const submittedWord = wordArray.join('');
  return await axios({
    method: 'POST',
    url: URL,
    data: {
      submittedWord,
    },
  }).then((result) => result.data.valid);
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

// TODO - useContext hook for used letters

const Board: React.FC = () => {
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] = JSON.parse(storedWords);
  const submittedLetters = submittedWords.flat();

  const firstLetter = determineFirstLetter(submittedWords);
  const initialWord = [firstLetter, '', '', '', ''];
  const [currentWord, setCurrentWord] = useState<string[]>(initialWord);

  const { shakeStyles, shakeWord } = useShakeWord();

  const handleSubmitWord = useCallback(async () => {
    const blankTileIdx = currentWord.findIndex((el) => !el);
    // check that letters in current word haven't been used
    const nonUniqueLetters = currentWord.map((letter, idx) =>
      idx === 0 ? false : submittedLetters.includes(letter)
    );
    // check that current word has unique letters
    const currentWordRepeatsLetters =
      new Set(currentWord).size !== currentWord.length;
    if (
      blankTileIdx === -1 &&
      !nonUniqueLetters.includes(true) &&
      !currentWordRepeatsLetters
    ) {
      const isValidWord = await spellCheckWord(currentWord);
      if (isValidWord) {
        const stringified = JSON.stringify([...submittedWords, currentWord]);
        localStorage.setItem('submittedWords', stringified);
        // next word should start with first letter of newly-submitted current word
        const firstLetter = determineFirstLetter([
          ...submittedWords,
          currentWord,
        ]);
        return setCurrentWord([firstLetter, '', '', '', '']);
      }
    }
    shakeWord();
    const firstLetter = currentWord[0];
    return setCurrentWord([firstLetter, '', '', '', '']);
  }, [currentWord, submittedWords, submittedLetters, shakeWord]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        // find idx of first empty string
        const idx = currentWord.findIndex((el) => !el);
        const newWord = currentWord.slice();
        // anchor tile cannot be deleted
        if (idx > 1) {
          // replace last letter with empty string to "delete" item from array
          newWord[idx - 1] = '';
        }
        // we're deleting the last item in the array
        if (idx === -1) {
          newWord[newWord.length - 1] = '';
        }
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
      if (currentWord.length <= 5) {
        // add the letter to the array
        return setCurrentWord((currentWord) => {
          const idx = currentWord.findIndex((el) => !el);
          const newWord = currentWord.slice();
          newWord[idx] = keyValue;
          return newWord;
        });
      }
    },
    [handleWhiteSpaceInput, currentWord]
  );

  const usedLetters = submittedLetters.concat(currentWord.flat());

  return (
    <BoardContainer className="boardContainer">
      <div
        className="boardWrapper"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <LettersBank usedLetters={usedLetters} />
        <SpringBoard submittedWords={submittedWords} />
        <div style={{ width: '320px' }} />
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
