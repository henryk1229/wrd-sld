import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import WordMatrix from './WordMatrix';
import { Spring } from '../../hooks/useRotateBoard';

const SpringBoardContainer = styled('div', {
  height: '360px',
  width: '360px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SB = styled(animated.div, {
  borderRadius: '3px',
  padding: 4,
  margin: 4,
});

interface Props {
  playedWords: string[][];
  spring: Spring;
}

// This component rotates board when a word is submitted
const SpringBoard: React.FC<Props> = ({ playedWords, spring }) => {
  return (
    <SpringBoardContainer>
      <SB style={spring}>
        <WordMatrix playedWords={playedWords} />
      </SB>
    </SpringBoardContainer>
  );
};

export default SpringBoard;
