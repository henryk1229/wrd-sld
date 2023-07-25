import { animated } from '@react-spring/web';
import { styled } from '@stitches/react';
import { Spring } from 'src/hooks/useRotateBoard';

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
};

const CurrentWordTile = styled(animated.div, {
  ...sharedStyles,
  width: '48px',
  height: '56px',
  margin: '8px',
  backgroundColor: '#9A3334',
});

const SpringBoardTile = styled(animated.div, {
  ...sharedStyles,
  width: '24px',
  height: '32px',
  margin: '8px',
  backgroundColor: '#217C7E',
  border: 'solid 2px #217C7E',
});

interface TileProps {
  letter: string;
  isCurrentWord: boolean;
  isAnchorTile: boolean;
  spring?: Spring;
}

const Tile = (props: TileProps) => {
  const { letter, isCurrentWord, spring, isAnchorTile } = props;
  return isCurrentWord ? (
    <CurrentWordTile
      style={{
        ...spring,
        ...(isAnchorTile
          ? { color: '#FFCC00' }
          : {
              color: '#fafafa',
            }),
      }}
    >
      {letter?.toUpperCase()}
    </CurrentWordTile>
  ) : (
    <SpringBoardTile>{letter.toUpperCase()}</SpringBoardTile>
  );
};

export default Tile;
