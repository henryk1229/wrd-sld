import { SpringValue, animated } from '@react-spring/web';
import { styled } from '@stitches/react';

const sharedStyles = {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  color: '#fafafa',
  width: '40px',
  height: '48px',
  margin: '4px',
};

const SpringBoardTile = styled(animated.div, {
  ...sharedStyles,
  backgroundColor: '#217C7E',
  border: 'solid 1px #046466',
  boxShadow: '2px 2px #751213',
});

const EmptyTile = styled('div', {
  ...sharedStyles,
  backgroundColor: '#217C7E',
  border: 'solid 1px #046466',
  boxShadow: '2px 2px #046466',
  opacity: 0.15,
});

const PendingWordTile = styled('div', {
  ...sharedStyles,
  backgroundColor: '#217C7E',
  border: 'solid 1px #046466',
  boxShadow: '2px 2px #046466',
  opacity: 0.6,
});

interface Props {
  letter: string;
  isPendingWord: boolean;
  isAnchorTile: boolean;
  spring?: {
    transform: SpringValue<string>;
  };
}

const Tile: React.FC<Props> = ({ letter, isPendingWord, isAnchorTile }) => {
  const color = isAnchorTile
    ? { color: '#FFCC00' }
    : {
        color: '#fafafa',
      };
  if (isPendingWord) {
    return (
      <PendingWordTile style={color}>{letter?.toUpperCase()}</PendingWordTile>
    );
  }
  return letter ? (
    <SpringBoardTile style={color}>{letter.toUpperCase()}</SpringBoardTile>
  ) : (
    <EmptyTile />
  );
};

export default Tile;
