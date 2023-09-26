import { styled } from '@stitches/react';
import LettersBankTile from './letters-bank-tile';

const DisplayContainer = styled('div', {
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const DisplayContent = styled('div', {
  display: 'flex',
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
});

interface Props {
  par: number;
  attempts: number;
}

const StatsDisplay: React.FC<Props> = ({ par, attempts }) => {
  return (
    <DisplayContainer>
      <DisplayContent>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                margin: '8px',
              }}
            >
              {'STATS'.split('').map((letter, idx) => (
                <LettersBankTile
                  key={`letter-${letter}-${idx}`}
                  letter={letter}
                  isUsedLetter={false}
                />
              ))}
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
    </DisplayContainer>
  );
};

export default StatsDisplay;
