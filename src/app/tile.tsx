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
};

const sharedSpringboardStyles = {
  width: '32px',
  height: '40px',
  margin: '8px',
};

const SpringBoardTile = styled(animated.div, {
  ...sharedStyles,
  ...sharedSpringboardStyles,
  backgroundColor: '#217C7E',
  border: 'solid 2px #217C7E',
});

const EmptyTile = styled('div', {
  ...sharedStyles,
  ...sharedSpringboardStyles,
  border: 'solid 2px #F3EFE0',
  boxShadow: 'none',
});

interface TileProps {
  letter: string;
  isCurrentWord: boolean;
  isAnchorTile: boolean;
  spring?: {
    transform: SpringValue<string>;
  };
}

const Tile = (props: TileProps) => {
  const { letter } = props;
  return letter ? (
    <SpringBoardTile>{letter.toUpperCase()}</SpringBoardTile>
  ) : (
    <EmptyTile />
  );
};

export default Tile;
