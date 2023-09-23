// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GameBoard from './GameBoard';
import { useState } from 'react';
import EndGameModal from './EndGameModal';
import { DailySalad } from './app';

// // TODO - handle local storage here?
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
  const [shouldEndGame, setShouldEndGame] = useState<boolean>(true);

  const { date, saladNumber, par, initialWord } = dailySalad;

  return (
    <>
      <GameBoard dailySalad={dailySalad} setShouldEndGame={setShouldEndGame} />
      <EndGameModal
        stats={{
          date,
          saladNumber,
          par,
          initialWord,
          // TODO
          attempts: 0,
          ranking: 'Good',
        }}
        open={shouldEndGame}
        onClose={() => setShouldEndGame(false)}
      />
    </>
  );
};

export default GameLayer;
