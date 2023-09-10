import { styled } from '@stitches/react';
import { useMemo } from 'react';
import LettersBankTile from './letters-bank-tile';

const LettersBankContainer = styled('div', {
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

interface Props {
  usedLetters: string[];
}

// an array of array of letters grouped by standard keyboard layout
const makeLettersMatrix = () => {
  return ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')];
};

const LettersBank: React.FC<Props> = ({ usedLetters }) => {
  const groupedLetters = useMemo(() => makeLettersMatrix(), []);

  return (
    <LettersBankContainer>
      {groupedLetters.map((letters) => {
        return (
          <div
            style={{
              display: 'flex',
              margin: '2px',
              justifyContent: 'center',
            }}
            key={`array-${letters[0]}`}
          >
            {letters.map((letter) => (
              <LettersBankTile
                key={`letter-${letter}`}
                letter={letter}
                isUsedLetter={usedLetters.includes(letter)}
              />
            ))}
          </div>
        );
      })}
    </LettersBankContainer>
  );
};

export default LettersBank;
