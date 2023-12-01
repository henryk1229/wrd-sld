import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import CurrentWord from './CurrentWord';
import WordsGrid from './WordsGrid';
import { useShakeWord } from '../../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from './LettersBank';
import { checkSubmitConditions, makeCurrentWord } from './utils';
import StatsDisplay from '../StatsDisplay';
import DeleteButton from '../buttons/DeleteButton';
import EnterButton from '../buttons/EnterButton';
import RestartButton from '../buttons/RestartButton';
import { useWatchGameFlow } from '../../hooks/useWatchGameFlow';

const URL = 'http://localhost:3000/spellcheck';

const BoardContainer = styled('div', {
  height: '560px',
  width: '1000px',
});

const WordsGridContainer = styled('div', {
  width: '324px',
  height: '324px',
  display: 'flex',
  flexDirection: 'column',
});

const SpringCaddy = styled(animated.div, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
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
  playedWords: string[][];
  attempts: string[][];
  ranking: string;
  solutionSets: Set<string>[];
  playNewWord: (word: string[]) => void;
  restartGame: () => void;
  setHTPModalOpen: (bool: boolean) => void;
  displayToast: () => void;
}

const GameBoard: React.FC<Props> = ({
  date,
  saladNumber,
  ranking,
  playedWords,
  attempts,
  solutionSets,
  playNewWord,
  restartGame,
  setHTPModalOpen,
  displayToast,
}) => {
  // control display of stats modal
  const [statsModalOpen, setStatsModalOpen] = useState<boolean>(false);
  const isLastTurn = playedWords.length === 3;

  const [currentWord, setCurrentWord] = useState<string[]>(
    makeCurrentWord({
      playedWords,
    })
  );

  // springs for animations
  const { shakeStyles, shakeWord } = useShakeWord();

  const submittedLetters = playedWords.flat();
  const usedLetters = submittedLetters.concat(currentWord.flat());

  const isWordSalad = playedWords.length === 4 && playedWords[0].length > 0;
  const isLastAttempt = attempts.length >= 7;
  const isBadAttempt =
    playedWords[0]?.length > 0 && solutionSets[0]?.size === 0;
  const isLostGame = isLastAttempt && isBadAttempt;
  const disableReset = playedWords.length === 1 || isWordSalad || isLastAttempt;
  const disableSubmitDelete = !currentWord[1] || isWordSalad || isLostGame;

  // display stats modal on finish
  useWatchGameFlow({
    isWordSalad,
    isBadAttempt,
    isLostGame,
    displayToast,
    restartGame,
    setStatsModalOpen,
  });

  const handleSubmitWord = useCallback(async () => {
    if (isLostGame || isWordSalad) {
      return shakeWord();
    }
    const { shouldAllowSubmit } = checkSubmitConditions({
      currentWord,
      submittedLetters,
    });
    if (shouldAllowSubmit) {
      const isValidWord = await spellCheckWord(currentWord);
      if (isValidWord) {
        if (isLastTurn) {
          return playNewWord(currentWord);
        }
        // next word should start with first letter of newly-submitted current word
        const nextWord = makeCurrentWord({
          playedWords: [...playedWords, currentWord],
        });
        setCurrentWord(nextWord);
        return playNewWord(currentWord);
      }
    }
    shakeWord();
    const nextWord = makeCurrentWord({
      playedWords,
    });
    return setCurrentWord(nextWord);
  }, [
    currentWord,
    playedWords,
    submittedLetters,
    isLastTurn,
    isLostGame,
    isWordSalad,
    playNewWord,
    shakeWord,
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
      newWord[newWord.length - 1] = '';
    }
    return setCurrentWord(newWord);
  }, [currentWord]);

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
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: '18px',
          margin: '8px 100px 0px',
        }}
      >
        <StatsDisplay
          stats={{
            date,
            saladNumber,
            attempts,
            ranking,
          }}
          statsModalOpen={statsModalOpen}
          setStatsModalOpen={setStatsModalOpen}
          setHTPModalOpen={setHTPModalOpen}
        />
      </div>
      <div
        className="boardWrapper"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <WordsGridContainer>
          <WordsGrid playedWords={playedWords} solutionSets={solutionSets} />
        </WordsGridContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
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
          disabled={disableSubmitDelete}
          onClick={handleSubmitWord}
        />
        <CurrentWord
          currentWord={currentWord}
          isLastWord={isLastTurn}
          handleKeyboardInput={handleKeyboardInput}
        />
        <DeleteButton
          disabled={disableSubmitDelete}
          onClick={clearLetterFromCurrentWord}
        />
        <RestartButton restartGame={restartGame} disabled={disableReset} />
      </SpringCaddy>
    </BoardContainer>
  );
};

export default GameBoard;
