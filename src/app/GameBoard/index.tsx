import { styled } from '@stitches/react';
import { useCallback, useMemo, useState } from 'react';
import CurrentWord from '../current-word';
import SpringBoard from '../SpringBoard';
import { useShakeWord } from '../../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from '../letters-bank';
import EndGameModal from '../end-game-modal';
import { DailySalad } from '../app';
import { checkSubmitConditions, makeCurrentWord } from './utils';

const URL = 'http://localhost:3000/spellcheck';

const BoardContainer = styled('div', {
  height: '560px',
  width: '1000px',
});

const spellCheckWord = async (wordArray: string[]): Promise<boolean> => {
  const submittedWord = wordArray.join('');
  return await axios({
    method: 'POST',
    url: URL,
    data: {
      submittedWord,
    },
  }).then((result) => result.data.valid);
};

interface Props {
  dailySalad: DailySalad;
}

const GameBoard: React.FC<Props> = ({ dailySalad }) => {
  // handle end game logic
  const [shouldEndGame, setShouldEndGame] = useState<boolean>(false);

  // create rootWord[] from daily initialWord
  const { initialWord } = dailySalad;
  const rootWord = initialWord.split('');

  // track stored words in localStorage
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] | [] = JSON.parse(storedWords);

  // aggregate root word and submitted words into one array
  const playedWords = useMemo(
    () =>
      rootWord
        ? submittedWords.length > 0
          ? [rootWord, ...submittedWords]
          : [rootWord]
        : [[]],
    [rootWord, submittedWords]
  );

  const submittedLetters = playedWords.flat();

  const isLastTurn = playedWords.length === 3;

  const initialCurrentWord = makeCurrentWord({
    playedWords,
    isLastTurn,
  });

  const [currentWord, setCurrentWord] = useState<string[]>(initialCurrentWord);

  // springs for animations
  const { shakeStyles, shakeWord } = useShakeWord();

  const handleSubmitWord = useCallback(async () => {
    const { shouldAllowSubmit } = checkSubmitConditions({
      currentWord,
      playedWords,
      submittedLetters,
      isLastTurn,
    });
    if (shouldAllowSubmit) {
      const isValidWord = await spellCheckWord(currentWord);
      if (isValidWord) {
        const stringified = JSON.stringify([...submittedWords, currentWord]);
        localStorage.setItem('submittedWords', stringified);
        if (isLastTurn) {
          return setShouldEndGame(true);
        }
        // next word should start with first letter of newly-submitted current word
        const nextWord = makeCurrentWord({
          playedWords: [...playedWords, currentWord],
          isLastTurn: playedWords.length === 2,
        });
        return setCurrentWord(nextWord);
      }
    }
    shakeWord();
    const nextWord = makeCurrentWord({
      playedWords,
      isLastTurn,
    });
    return setCurrentWord(nextWord);
  }, [
    currentWord,
    playedWords,
    submittedWords,
    submittedLetters,
    isLastTurn,
    shakeWord,
  ]);

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
          isLastTurn
            ? (newWord[newWord.length - 2] = '')
            : (newWord[newWord.length - 1] = '');
        }
        return setCurrentWord(newWord);
      }
      if (input === 'Enter') {
        return handleSubmitWord();
      }
    },
    [currentWord, isLastTurn, handleSubmitWord]
  );

  // handle keyboard input, branch between whitespace and letter input
  const handleKeyboardInput = useCallback(
    (keyValue: string, keyCode: string) => {
      const isLetterInput = keyCode.includes('Key');
      // handle 'enter', 'delete', etc.
      if (!isLetterInput) {
        return handleWhiteSpaceInput(keyValue);
      }
      if (submittedLetters.includes(keyValue)) {
        return shakeWord();
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
    [handleWhiteSpaceInput, currentWord, submittedLetters, shakeWord]
  );

  const usedLetters = submittedLetters.concat(currentWord.flat());

  return (
    <BoardContainer className="boardContainer">
      <div
        className="boardWrapper"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <LettersBank usedLetters={usedLetters} />
        <SpringBoard playedWords={playedWords} />
        <div style={{ width: '320px' }} />
      </div>
      <CurrentWord
        currentWord={currentWord}
        shakeStyles={shakeStyles}
        isLastWord={isLastTurn}
        handleKeyboardInput={handleKeyboardInput}
      />
      <EndGameModal
        open={shouldEndGame}
        onClose={() => setShouldEndGame(false)}
      />
    </BoardContainer>
  );
};

export default GameBoard;
