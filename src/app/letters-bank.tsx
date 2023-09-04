import { styled } from '@stitches/react';
import { useMemo } from 'react';
import LettersBankTile from './letters-bank-tile';

const LettersBankContainer = styled('div', {
  height: '360px',
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

interface Props {
  usedLetters: string[];
}

const makeLettersMatrix = () => {
  return [
    ['a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p'],
    ['q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x'],
    ['y', 'z'],
  ];
};

// This component rotates board when a word is submitted
const LettersBank: React.FC<Props> = ({ usedLetters }) => {
  const letterMatrix = useMemo(() => makeLettersMatrix(), []);
  return (
    <LettersBankContainer>
      {letterMatrix.map((array) => {
        return (
          <div style={{ display: 'flex' }} key={`array-${array[0]}`}>
            {array.map((letter) => (
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
