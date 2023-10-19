import GameBoard from './GameBoard';
import { useState } from 'react';
import { DailySalad } from './app';
import HowToPlayModal from './HowToPlayModal';

// // TODO - set salad details in local storage for streak tracking?
// const setSaladInStorage = (dailySalad: DailySalad | null) => {
//   if (dailySalad) {
//     // const current_date = new Date();
//     // const yyyyMmDd = current_date.toISOString().split('T')[0];
//     // const rowDate = dailySalad.date.split('T')[0];
//     // const gameInPlay = localStorage.getItem(`${yyyyMmDd}`);
//     // track submitted words, scoped to game
//     // localStorage.setItem(`${rowDate}`, JSON.stringify([]));
//   }
// };

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

  // create rootWord[] from daily initialWord
  const { date, saladNumber, par, initialWord } = dailySalad;
  const rootWord = initialWord.split('');

  // track stored words in localStorage
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] | [] = JSON.parse(storedWords);

  const [playedWords, setPlayedWords] = useState<string[][]>(() =>
    submittedWords.length > 0 ? [rootWord, ...submittedWords] : [rootWord]
  );

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
    const stringified = JSON.stringify([...submittedWords, newWord]);
    localStorage.setItem('submittedWords', stringified);
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
