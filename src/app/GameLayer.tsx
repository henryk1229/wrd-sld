import GameBoard from './GameBoard';
import { useEffect, useState } from 'react';
import { DailySalad } from './app';
import HowToPlayModal from './HowToPlayModal';

// TODO - refactor approach to account for this running before scopeSaladFn?
// clean up stored, submitted handling?
const retrieveLSData = (
  dailySalad: DailySalad
): {
  storedWords: string[][];
  storedAttempts: number;
} => {
  // retrieve data from local storage, scoped to date
  const { date } = dailySalad;
  // split '10/25/10' from ISO string
  const yyyyMmDd = date.split('T')[0];
  const storedSalad =
    localStorage.getItem(`${yyyyMmDd}`) ??
    '{ "submittedWords": [], "attempts": 1 }';
  const parsed = JSON.parse(storedSalad);
  const { submittedWords, attempts } = parsed;

  // TODO - clean up stored, submitted, played handling?
  // format data
  const storedWords: string[][] = [...submittedWords];
  const storedAttempts = parseInt(attempts, 10);

  return {
    storedWords,
    storedAttempts,
  };
};

// scoped guessed words to date of salad
const scopeSaladToDate = (dailySalad: DailySalad) => {
  const { date } = dailySalad;
  // split '10/25/10' from ISO string
  const yyyyMmDd = date.split('T')[0];
  const gameInProgress = localStorage.getItem(`${yyyyMmDd}`);

  if (!gameInProgress) {
    // track submitted words, scoped to game
    localStorage.setItem(
      `${yyyyMmDd}`,
      JSON.stringify({
        submittedWords: [],
        attempts: 1,
      })
    );
  }
};

export const makeRankingsObject = (par: number) => {
  return {
    [par - 1]: 'Good',
    [par - 2]: 'Great',
    [par - 4]: 'Genius',
  };
};

export const getRanking = ({
  attempts,
  par,
}: {
  attempts: number;
  par: number;
}) => {
  if (attempts <= par - 4) {
    return 'Perfect';
  }
  if (attempts <= par - 2) {
    return 'Great';
  }
  if (attempts <= par - 1) {
    return 'Good';
  }
  return 'Normal';
};

interface Props {
  dailySalad: DailySalad;
}

const GameLayer: React.FC<Props> = ({ dailySalad }) => {
  // control display of modals
  const [howToPlayModalOpen, setHTPModalOpen] = useState<boolean>(true);
  const [statsModalOpen, setStatsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    scopeSaladToDate(dailySalad);
  }, [dailySalad]);

  // create rootWord[] from daily initialWord
  const { date, saladNumber, par, initialWord } = dailySalad;
  const rootWord = initialWord.split('');

  // track stored words in localStorage
  const { storedWords } = retrieveLSData(dailySalad);

  // aggregate root and stored words into one array
  const [playedWords, setPlayedWords] = useState<string[][]>(() =>
    storedWords.length > 0 ? [rootWord, ...storedWords] : [rootWord]
  );

  // track attempts in lS
  const { storedAttempts: attempts } = retrieveLSData(dailySalad);
  const ranking = getRanking({ attempts, par });

  const restartGame = () => {
    const { date } = dailySalad;
    // split '10/25/10' from ISO string
    const yyyyMmDd = date.split('T')[0];
    const newAttempts = attempts + 1;
    // reset words and tally restart
    localStorage.setItem(
      yyyyMmDd,
      JSON.stringify({
        submittedWords: [],
        attempts: newAttempts,
      })
    );
    // trigger refresh
    const newRoot = [...rootWord];
    setPlayedWords([newRoot]);
  };

  // this fn sets word in local storage, and set played word state
  const playNewWord = (newWord: string[]) => {
    const { date } = dailySalad;
    // split '10/25/10' from ISO string
    const yyyyMmDd = date.split('T')[0];
    const { storedAttempts } = retrieveLSData(dailySalad);
    const stringified = JSON.stringify({
      submittedWords: [...storedWords, newWord],
      attempts: storedAttempts,
    });
    localStorage.setItem(yyyyMmDd, stringified);
    setPlayedWords([...playedWords, newWord]);
  };

  return (
    <>
      <GameBoard
        date={date}
        saladNumber={saladNumber}
        ranking={ranking}
        key={attempts}
        par={par}
        playedWords={playedWords}
        attempts={attempts}
        statsModalOpen={statsModalOpen}
        playNewWord={playNewWord}
        restartGame={restartGame}
        setStatsModalOpen={setStatsModalOpen}
        setHTPModalOpen={setHTPModalOpen}
      />
      <HowToPlayModal
        open={howToPlayModalOpen}
        onClose={() => setHTPModalOpen(false)}
      />
    </>
  );
};

export default GameLayer;
