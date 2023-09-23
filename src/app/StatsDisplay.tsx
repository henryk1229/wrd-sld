import { styled } from '@stitches/react';
import { DailySalad } from './app';
import RestartButton from './RestartButton';

const DisplayContainer = styled('div', {
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const DisplayContent = styled('div', {
  margin: '8px',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
});

interface Props {
  dailySalad: DailySalad;
  attempts: number;
  restartGame: () => void;
}

const StatsDisplay: React.FC<Props> = ({
  dailySalad,
  attempts,
  restartGame,
}) => {
  const { par } = dailySalad;
  return (
    <DisplayContainer>
      <DisplayContent>
        <div
          style={{
            margin: '4px',
          }}
        >
          Attempts: {attempts}
        </div>
        <div
          style={{
            margin: '4px',
          }}
        >
          Par: {par}
        </div>
      </DisplayContent>
      <RestartButton restartGame={restartGame} />
    </DisplayContainer>
  );
};

export default StatsDisplay;
