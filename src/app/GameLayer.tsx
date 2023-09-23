import GameBoard from './GameBoard';
import { useState } from 'react';
import EndGameModal from './EndGameModal';
import { DailySalad } from './app';

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

interface Props {
  dailySalad: DailySalad;
}

const GameLayer: React.FC<Props> = ({ dailySalad }) => {
  // handle end game logic
  const [shouldEndGame, setShouldEndGame] = useState<boolean>(false);

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

  const restartGame = () => {
    // tally restart
    const newAttempts = attempts + 1;
    localStorage.setItem('attempts', newAttempts.toString());
    // clear submitted words
    localStorage.removeItem('submittedWords');
    // trigger refresh
    setPlayedWords([rootWord]);
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
        dailySalad={dailySalad}
        playedWords={playedWords}
        attempts={attempts}
        playNewWord={playNewWord}
        restartGame={restartGame}
        setShouldEndGame={setShouldEndGame}
      />
      <EndGameModal
        stats={{
          date,
          saladNumber,
          par,
          initialWord,
          // TODO
          attempts,
          ranking: 'Good',
        }}
        open={shouldEndGame}
        onClose={() => setShouldEndGame(false)}
      />
    </>
  );
};

export default GameLayer;
