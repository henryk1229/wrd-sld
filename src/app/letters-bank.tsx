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

const makeConsonantsMatrix = () => {
  return [
    ['b', 'c', 'd', 'f', 'g'],
    ['h', 'j', 'k', 'l', 'm'],
    ['n', 'p', 'q', 'r', 's'],
    ['t', 'v', 'w'],
    ['x', 'y', 'z'],
  ];
};

const makeVowelsMatrix = () => {
  return ['a', 'e', 'i', 'o', 'u'];
};

// This component rotates board when a word is submitted
const LettersBank: React.FC<Props> = ({ usedLetters }) => {
  const groupedConsonants = useMemo(() => makeConsonantsMatrix(), []);
  const vowels = useMemo(() => makeVowelsMatrix(), []);
  return (
    <LettersBankContainer>
      <div style={{ display: 'flex', margin: '8px' }}>
        {vowels.map((vowel) => (
          <LettersBankTile
            key={`letter-${vowel}`}
            letter={vowel}
            isUsedLetter={usedLetters.includes(vowel)}
          />
        ))}
      </div>
      {groupedConsonants.map((consonants) => {
        return (
          <div
            style={{ display: 'flex', margin: '2px' }}
            key={`array-${consonants[0]}`}
          >
            {consonants.map((letter) => (
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
