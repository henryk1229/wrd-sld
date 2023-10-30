import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import CurrentWord from '../CurrentWord';
import WordsGrid from '../WordsGrid';
import { useShakeWord } from '../../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from '../LettersBank';
import { checkSubmitConditions, makeCurrentWord } from './utils';
import StatsDisplay from '../StatsDisplay';
import DeleteButton from '../DeleteButton';
import EnterButton from '../EnterButton';
import RestartButton from '../RestartButton';

const URL = 'http://localhost:3000/spellcheck';

const BoardContainer = styled('div', {
  height: '560px',
  width: '1000px',
});

const SpringCaddy = styled(animated.div, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  date: string;
  saladNumber: number;
  par: number;
  playedWords: string[][];
  attempts: number;
  ranking: string;
  statsModalOpen: boolean;
  playNewWord: (word: string[]) => void;
  restartGame: () => void;
  setStatsModalOpen: (bool: boolean) => void;
  setHTPModalOpen: (bool: boolean) => void;
}

const GameBoard: React.FC<Props> = ({
  date,
  saladNumber,
  ranking,
  par,
  playedWords,
  attempts,
  statsModalOpen,
  playNewWord,
  restartGame,
  setStatsModalOpen,
  setHTPModalOpen,
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
  const disableReset = playedWords.length === 1;

  // TODO - clean up id if performance becomes an issue
  const displayModalOnEndGame = useCallback(() => {
    setTimeout(() => setStatsModalOpen(true), 800);
  }, [setStatsModalOpen]);

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
          playNewWord(currentWord);
          // display stats modal on finish
          return displayModalOnEndGame();
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
    displayModalOnEndGame,
  ]);

  const clearLetterFromCurrentWord = useCallback(() => {
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
  }, [currentWord, isLastTurn]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        clearLetterFromCurrentWord();
      }
      if (input === 'Enter') {
        return handleSubmitWord();
      }
    },
    [handleSubmitWord, clearLetterFromCurrentWord]
  );

  // handle keyboard input, branch between whitespace and letter input
  const handleKeyboardInput = useCallback(
    (keyValue: string, keyCode: string) => {
      const isLetterInput = keyCode.includes('Key');
      // handle 'enter', 'delete', etc.
      if (!isLetterInput) {
        return handleWhiteSpaceInput(keyValue);
      }
      if (usedLetters.includes(keyValue)) {
        // early return to prevent reusing letters in currentWord
        return;
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
    [handleWhiteSpaceInput, currentWord, usedLetters]
  );

  const handleClick = useCallback(
    (ev: BaseSyntheticEvent) => {
      // letters are lower case until formatted in the Tile component
      const letter = ev.target?.innerText?.toLowerCase();

      // guard against click on wrapper div
      if (letter.length > 1) {
        return;
      }

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
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '16px 32px',
        }}
      >
        <WordsGrid playedWords={playedWords} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <StatsDisplay
            stats={{
              date,
              saladNumber,
              par,
              attempts,
              ranking,
            }}
            statsModalOpen={statsModalOpen}
            setStatsModalOpen={setStatsModalOpen}
            setHTPModalOpen={setHTPModalOpen}
          />
          <LettersBank usedLetters={usedLetters} onClick={handleClick} />
        </div>
      </div>
      <SpringCaddy
        style={{
          ...shakeStyles,
        }}
      >
        {/* TODO - rm empty div for spacing  */}
        <div style={{ width: '40px', height: '40px' }} />
        <EnterButton
          disabled={isLastTurn ? !currentWord[3] : !currentWord[4]}
          onClick={handleSubmitWord}
        />
        <CurrentWord
          currentWord={currentWord}
          isLastWord={isLastTurn}
          handleKeyboardInput={handleKeyboardInput}
        />
        <DeleteButton
          disabled={!currentWord[1]}
          onClick={clearLetterFromCurrentWord}
        />
        <RestartButton restartGame={restartGame} disabled={disableReset} />
      </SpringCaddy>
    </BoardContainer>
  );
};

export default GameBoard;
