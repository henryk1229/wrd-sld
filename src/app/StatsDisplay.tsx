import { styled } from '@stitches/react';
import LettersBankTile from './LettersBankTile';
import RestartButton from './RestartButton';

const DisplayContainer = styled('div', {
  width: '320px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const DisplayContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
});

interface Props {
  par: number;
  attempts: number;
  startOverDisabled: boolean;
  restartGame: () => void;
}

const StatsDisplay: React.FC<Props> = ({
  par,
  attempts,
  startOverDisabled,
  restartGame,
}) => {
  return (
    <DisplayContainer>
      <DisplayContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            {'STATS'.split('').map((letter, idx) => (
              <LettersBankTile
                key={`letter-${letter}-${idx}`}
                letter={letter}
                isUsedLetter={false}
                isStatsDisplay={true}
              />
            ))}
          </div>
          <div style={{ margin: '4px' }}>Attempts: {attempts}</div>
          <div style={{ margin: '4px' }}>Par: {par}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ margin: '4px' }}>Good: {par - 1}</div>
          <div style={{ margin: '4px' }}>Great: {par - 2}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ margin: '4px' }}>Genius: {par - 4}</div>
        </div>
        <RestartButton restartGame={restartGame} disabled={startOverDisabled} />
      </DisplayContent>
    </DisplayContainer>
  );
};

export default StatsDisplay;
