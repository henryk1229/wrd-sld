import { styled } from '@stitches/react';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import CurrentWord from '../current-word';
import SpringBoard from '../SpringBoard';
import { useShakeWord } from '../../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from '../LettersBank';
import { checkSubmitConditions, makeCurrentWord } from './utils';
import StatsDisplay from '../StatsDisplay';
import RestartButton from '../RestartButton';

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
  par: number;
  playedWords: string[][];
  attempts: number;
  playNewWord: (word: string[]) => void;
  restartGame: () => void;
  setShouldEndGame: (bool: boolean) => void;
}

const GameBoard: React.FC<Props> = ({
  par,
  playedWords,
  attempts,
  playNewWord,
  restartGame,
  setShouldEndGame,
}) => {
  const isLastTurn = playedWords.length === 3;

  const [currentWord, setCurrentWord] = useState<string[]>(
    makeCurrentWord({
      playedWords,
      isLastTurn,
    })
  );

  // springs for animations
  const { shakeStyles, shakeWord } = useShakeWord();

  const submittedLetters = playedWords.flat();
  const usedLetters = submittedLetters.concat(currentWord.flat());

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
        if (isLastTurn) {
          return setShouldEndGame(true);
        }
        // next word should start with first letter of newly-submitted current word
        const nextWord = makeCurrentWord({
          playedWords: [...playedWords, currentWord],
          isLastTurn: playedWords.length === 2,
        });
        setCurrentWord(nextWord);
        return playNewWord(currentWord);
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
    submittedLetters,
    isLastTurn,
    playNewWord,
    shakeWord,
    setShouldEndGame,
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

  const handleClick = useCallback(
    (ev: BaseSyntheticEvent) => {
      // letters are lower case until formatted in the Tile component
      const letter = ev.target?.innerText?.toLowerCase();

      if (currentWord.length <= 5 && !usedLetters.includes(letter)) {
        // add the letter to the array
        return setCurrentWord((currentWord) => {
          const idx = currentWord.findIndex((el) => !el);
          const newWord = currentWord.slice();
          newWord[idx] = letter;
          return newWord;
        });
      }
    },
    [currentWord.length, usedLetters]
  );

  return (
    <BoardContainer className="boardContainer">
      <div
        className="boardWrapper"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <LettersBank usedLetters={usedLetters} onClick={handleClick} />
        <SpringBoard playedWords={playedWords} />
        <StatsDisplay par={par} attempts={attempts} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CurrentWord
          currentWord={currentWord}
          shakeStyles={shakeStyles}
          isLastWord={isLastTurn}
          handleKeyboardInput={handleKeyboardInput}
        />
        <RestartButton
          restartGame={restartGame}
          disabled={playedWords.length === 1}
        />
      </div>
    </BoardContainer>
  );
};

export default GameBoard;
