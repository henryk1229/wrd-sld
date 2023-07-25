import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import Word from './word';
import { Spring } from '../hooks/useRotateBoard';

const SpringBoardContainer = styled('div', {
  position: 'relative',
  height: '460px',
  width: '720px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SB = styled(animated.div, {
  height: '400 px',
  width: '400 px',
  border: 'solid 1px #1a1a1a',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)',
  borderRadius: '3px',
  padding: 4,
  margin: 4,
});

interface SBProps {
  submittedWords: string[][];
  spring: Spring;
}

// This component rotates board when a word is submitted
const SpringBoard: React.FC<SBProps> = (props) => {
  const { submittedWords, spring } = props;

  return (
    <SpringBoardContainer>
      <SB style={spring}>
        {submittedWords.map((letters: string[], idx: number) => (
          <div key={idx}>
            <Word letters={letters} isCurrentWord={false} />
          </div>
        ))}
      </SB>
    </SpringBoardContainer>
  );
};

export default SpringBoard;
