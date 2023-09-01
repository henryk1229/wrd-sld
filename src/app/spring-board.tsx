import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import WordMatrix from './word-matrix';

const SpringBoardContainer = styled('div', {
  position: 'relative',
  height: '460px',
  width: '720px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SB = styled(animated.div, {
  border: 'solid 1px #1a1a1a',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)',
  borderRadius: '3px',
  padding: 4,
  margin: 4,
});

interface SBProps {
  submittedWords: string[][];
}

// This component rotates board when a word is submitted
const SpringBoard: React.FC<SBProps> = (props) => {
  const { submittedWords } = props;

  return (
    <SpringBoardContainer>
      <SB>
        <WordMatrix submittedWords={submittedWords} />
      </SB>
    </SpringBoardContainer>
  );
};

export default SpringBoard;
