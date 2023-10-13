import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import WordMatrix from './WordMatrix';

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
}

// This component rotates board when a word is submitted
const SpringBoard: React.FC<Props> = (props) => {
  const { playedWords } = props;

  return (
    <SpringBoardContainer>
      <SB>
        <WordMatrix playedWords={playedWords} />
      </SB>
    </SpringBoardContainer>
  );
};

export default SpringBoard;
