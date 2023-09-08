import { SpringValue, animated } from '@react-spring/web';
import { styled } from '@stitches/react';

const sharedStyles = {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  border: 'solid 2px #1a1a1a',
  borderRadius: '3px',
  boxShadow: '1px 1px',
  color: '#fafafa',
  width: '32px',
  height: '40px',
  margin: '8px',
};

const SpringBoardTile = styled(animated.div, {
  ...sharedStyles,
  backgroundColor: '#217C7E',
  border: 'solid 2px #217C7E',
});

const EmptyTile = styled('div', {
  ...sharedStyles,
  border: 'solid 2px #F3EFE0',
  boxShadow: 'none',
});

const BorderTile = styled('div', {
  ...sharedStyles,
  border: 'solid 2px #1a1a1a',
  backgroundColor: '#217C7E',
  boxShadow: 'none',
  opacity: 0.15,
});

interface Props {
  letter: string;
  isBorderTile: boolean;
  isAnchorTile: boolean;
  spring?: {
    transform: SpringValue<string>;
  };
}

const Tile: React.FC<Props> = ({ letter, isBorderTile, isAnchorTile }) => {
  return letter ? (
    <SpringBoardTile
      style={{
        ...(isAnchorTile
          ? { color: '#FFCC00' }
          : {
              color: '#fafafa',
            }),
      }}
    >
      {letter.toUpperCase()}
    </SpringBoardTile>
  ) : isBorderTile ? (
    <BorderTile />
  ) : (
    <EmptyTile />
  );
};

export default Tile;
