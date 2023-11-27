import GameBoard from './GameBoard';
import { useState } from 'react';
import { DailySalad } from './app';

const retrieveLSData = (
  dailySalad: DailySalad
): {
  storedWords: string[][];
  storedAttempts: string[][];
} => {
  // retrieve data from local storage, scoped to saladNumber
  const { saladNumber } = dailySalad;
  const storedSalad =
    localStorage.getItem(saladNumber.toString()) ??
    '{ "submittedWords": [], "attempts": [] }';
  const parsed = JSON.parse(storedSalad);
  const { submittedWords, attempts } = parsed;

  // TODO - clean up stored, submitted, played handling?
  // format data
  const storedWords: string[][] = [...submittedWords];
  const storedAttempts: string[][] = [...attempts];

  return {
    storedWords,
    storedAttempts,
  };
};

// TODO - does this need to be run as an effect?
// scoped guessed words to date of salad
// const scopeSaladToDate = (dailySalad: DailySalad) => {
//   const { saladNumber } = dailySalad;
//   // split '10/25/10' from ISO string
//   const yyyyMmDd = date.split('T')[0];
//   const gameInProgress = localStorage.getItem(saladNumber.toString());

//   if (!gameInProgress) {
//     // track submitted words, scoped to game
//     localStorage.setItem(
//       saladNumber.toString(),
//       JSON.stringify({
//         submittedWords: [],
//         attempts: 1,
//       })
//     );
//   }
// };

export const getRanking = ({ numAttempts }: { numAttempts: number }) => {
  if (numAttempts <= 1) {
    return 'Perfect';
  }
  if (numAttempts <= 2) {
    return 'Great';
  }
  if (numAttempts <= 4) {
    return 'Good';
  }
  return 'Normal';
};

interface Props {
  dailySalad: DailySalad;
  setHTPModalOpen: (bool: boolean) => void;
}

const GameLayer: React.FC<Props> = ({ dailySalad, setHTPModalOpen }) => {
  const { date, saladNumber, par, initialWord, solutionSet } = dailySalad;

  // track stored words and attempts in localStorage
  const { storedWords, storedAttempts: pastAttempts } =
    retrieveLSData(dailySalad);

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
    const { saladNumber } = dailySalad;
    // reset words and tally restart
    const latestAttempt = playedWords.map((word) => word.join(''));
    localStorage.setItem(
      saladNumber.toString(),
      JSON.stringify({
        submittedWords: [],
        attempts: [...pastAttempts, latestAttempt],
      })
    );
    // trigger refresh
    const newRoot = [...rootWord];
    setPlayedWords([newRoot]);
  };

  // this fn sets word in local storage, and set played word state
  const playNewWord = (newWord: string[]) => {
    const { saladNumber } = dailySalad;
    const stringified = JSON.stringify({
      submittedWords: [...storedWords, newWord],
      attempts: pastAttempts,
    });
    localStorage.setItem(saladNumber.toString(), stringified);
    setPlayedWords([...playedWords, newWord]);
  };

  const currentAttempt = playedWords.map((word) => word.join(''));
  const allAttempts = [...pastAttempts, currentAttempt];

  return (
    <GameBoard
      key={playedWords.length}
      date={date}
      saladNumber={saladNumber}
      ranking={getRanking({ numAttempts: allAttempts.length })}
      par={par}
      playedWords={playedWords}
      attempts={allAttempts}
      solutionSet={solutionSet}
      playNewWord={playNewWord}
      restartGame={restartGame}
      setHTPModalOpen={setHTPModalOpen}
    />
  );
};

export default GameLayer;
