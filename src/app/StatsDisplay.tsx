import { styled } from '@stitches/react';
import RestartButton from './RestartButton';

const DisplayContainer = styled('div', {
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  padding: '16px',
});

const DisplayContent = styled('div', {
  display: 'flex',
  margin: '8px',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
});

interface Props {
  par: number;
  attempts: number;
  restartGame: () => void;
}

const StatsDisplay: React.FC<Props> = ({ par, attempts, restartGame }) => {
  return (
    <DisplayContainer>
      <DisplayContent>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '16px',
            }}
          >
            <div
              style={{
                margin: '8px',
              }}
            >
              Stats
            </div>
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
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: '4px',
            }}
          >
            <div
              style={{
                margin: '4px',
              }}
            >
              Good: {par - 1}
            </div>
            <div
              style={{
                margin: '4px',
              }}
            >
              Great: {par - 2}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: '2px',
            }}
          >
            <div
              style={{
                margin: '4px',
              }}
            >
              Genius: {par - 4}
            </div>
          </div>
        </div>
      </DisplayContent>
      <RestartButton restartGame={restartGame} />
    </DisplayContainer>
  );
};

export default StatsDisplay;
