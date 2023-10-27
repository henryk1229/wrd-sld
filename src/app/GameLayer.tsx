import GameBoard from './GameBoard';
import { useState } from 'react';
import { DailySalad } from './app';

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

// TODO - does this need to be run as an effect?
// scoped guessed words to date of salad
// const scopeSaladToDate = (dailySalad: DailySalad) => {
//   const { date } = dailySalad;
//   // split '10/25/10' from ISO string
//   const yyyyMmDd = date.split('T')[0];
//   const gameInProgress = localStorage.getItem(`${yyyyMmDd}`);

//   if (!gameInProgress) {
//     // track submitted words, scoped to game
//     localStorage.setItem(
//       `${yyyyMmDd}`,
//       JSON.stringify({
//         submittedWords: [],
//         attempts: 1,
//       })
//     );
//   }
// };

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
  setHTPModalOpen: (bool: boolean) => void;
}

const GameLayer: React.FC<Props> = ({ dailySalad, setHTPModalOpen }) => {
  const { date, saladNumber, par, initialWord } = dailySalad;

  // track stored words and attempts in localStorage
  const { storedWords, storedAttempts: attempts } = retrieveLSData(dailySalad);

  // useEffect(() => {
  //   scopeSaladToDate(dailySalad);
  // }, [dailySalad]);

  // create rootWord[] from daily initialWord ''
  const rootWord = initialWord.split('');

  // aggregate root and stored words into one array
  const [playedWords, setPlayedWords] = useState<string[][]>(() =>
    storedWords.length > 0 ? [rootWord, ...storedWords] : [rootWord]
  );

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
    const stringified = JSON.stringify({
      submittedWords: [...storedWords, newWord],
      attempts,
    });
    localStorage.setItem(yyyyMmDd, stringified);
    setPlayedWords([...playedWords, newWord]);
  };

  return (
    <GameBoard
      date={date}
      saladNumber={saladNumber}
      ranking={getRanking({ attempts, par })}
      par={par}
      playedWords={playedWords}
      attempts={attempts}
      playNewWord={playNewWord}
      restartGame={restartGame}
      setHTPModalOpen={setHTPModalOpen}
    />
  );
};

export default GameLayer;
