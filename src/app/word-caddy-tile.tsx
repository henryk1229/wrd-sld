import { SpringValue, animated } from '@react-spring/web';
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
  width: '56px',
  height: '64px',
  margin: '8px',
  backgroundColor: '#9A3334',
};

const LetterTile = styled(animated.div, {
  ...sharedStyles,
});

const BlankTile = styled(animated.div, {
  ...sharedStyles,
  opacity: 0.15,
});

interface Props {
  letter: string;
  isAnchorTile: boolean;
  spring: {
    transform: SpringValue<string>;
  };
}

const WordCaddyTile: React.FC<Props> = ({ letter, spring, isAnchorTile }) => {
  return !letter ? (
    <BlankTile style={spring} />
  ) : (
    <LetterTile
      style={{
        ...spring,
        ...(isAnchorTile
          ? { color: '#FFCC00' }
          : {
              color: '#fafafa',
            }),
      }}
    >
      {letter.toUpperCase()}
    </LetterTile>
  );
};

export default WordCaddyTile;