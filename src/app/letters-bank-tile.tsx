import { SpringValue } from '@react-spring/web';
import { styled } from '@stitches/react';
import React from 'react';

const sharedStyles = {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '1px 1px black',
  color: '#fafafa',
  width: '24px',
  height: '32px',
  margin: '4px',
  backgroundColor: '#9A3334',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
};

const AvailableLetterTile = styled('div', {
  ...sharedStyles,
});

const UsedLetterTile = styled('div', {
  ...sharedStyles,
  opacity: 0.15,
});

interface Props {
  letter: string;
  isUsedLetter: boolean;
  spring?: {
    transform: SpringValue<string>;
  };
}

const LettersBankTile: React.FC<Props> = ({ letter, isUsedLetter }) => {
  return !isUsedLetter ? (
    <AvailableLetterTile>{letter.toUpperCase()}</AvailableLetterTile>
  ) : (
    <UsedLetterTile>{letter.toUpperCase()}</UsedLetterTile>
  );
};

export default LettersBankTile;
