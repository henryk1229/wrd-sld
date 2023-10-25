import GameBoard from './GameBoard';
import { useEffect, useState } from 'react';
import { DailySalad } from './app';
import HowToPlayModal from './HowToPlayModal';

// TODO - refactor approach to account for this running before scopeSaladFn
const retrieveStoredWords = (dailySalad: DailySalad): string[] => {
  const { date } = dailySalad;
  // split '10/25/10' from ISO string
  const yyyyMmDd = date.split('T')[0];
  const storedSalad =
    localStorage.getItem(`${yyyyMmDd}`) ?? '{ "submittedWords": []}';
  const parsed = JSON.parse(storedSalad);
  const { submittedWords } = parsed;
  return submittedWords;
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
  // const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const storedWords = retrieveStoredWords(dailySalad);

  // TODO - clean up stored, submitted, played handling
  console.log('stored', storedWords);
  const submittedWords: string[][] = [...storedWords];

  console.log('submitted', submittedWords);

  const [playedWords, setPlayedWords] = useState<string[][]>(() =>
    submittedWords.length > 0 ? [rootWord, ...submittedWords] : [rootWord]
  );

  console.log('played', playedWords);

  // track attempts in lS
  const storedAttempts = localStorage.getItem('attempts') ?? '1';
  const attempts = parseInt(storedAttempts, 10);

  const ranking = getRanking({ attempts, par });

  const restartGame = () => {
    // tally restart
    const newAttempts = attempts + 1;
    localStorage.setItem('attempts', newAttempts.toString());
    // clear submitted words
    localStorage.removeItem('submittedWords');
    // trigger refresh
    const newRoot = [...rootWord];
    setPlayedWords([newRoot]);
  };

  // this fn sets word in local storage, and set played word state
  const playNewWord = (newWord: string[]) => {
    const { date } = dailySalad;
    // split '10/25/10' from ISO string
    const yyyyMmDd = date.split('T')[0];
    const stringified = JSON.stringify({
      submittedWords: [...submittedWords, newWord],
    });
    console.log('submitting', { yyyyMmDd: stringified });
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
