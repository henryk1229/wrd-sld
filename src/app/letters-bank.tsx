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

const LettersBank: React.FC<Props> = ({ usedLetters }) => {
  const groupedConsonants = useMemo(() => makeConsonantsMatrix(), []);
  const vowels = useMemo(() => makeVowelsMatrix(), []);
  const availableConsonants = groupedConsonants.map((group) =>
    group.filter((letter) => !usedLetters.includes(letter))
  );
  const availableVowels = vowels.filter(
    (vowel) => !usedLetters.includes(vowel)
  );
  return (
    <LettersBankContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '8px',
          width: '180px',
        }}
      >
        <div style={{ display: 'flex', margin: '2px' }}>
          {availableVowels.map((vowel) => (
            <LettersBankTile
              key={`letter-${vowel}`}
              letter={vowel}
              isUsedLetter={usedLetters.includes(vowel)}
            />
          ))}
        </div>
        {availableConsonants.map((consonants) => {
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
      </div>
    </LettersBankContainer>
  );
};

export default LettersBank;
