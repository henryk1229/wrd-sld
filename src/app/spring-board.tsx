import { animated } from '@react-spring/web';
import Word from './word';
import { Springs } from '../hooks/useRotateBoard';

interface SBProps {
  submittedWords: string[][];
  springs: Springs;
}

// This component rotates board when a word is submitted
const SpringBoard: React.FC<SBProps> = (props) => {
  const { submittedWords, springs } = props;

  const tempStyles = {
    // width: 720,
    // height: 600,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 4,
    margin: 4,
  };

  return (
    <animated.div
      style={{
        ...tempStyles,
        ...springs,
      }}
    >
      {submittedWords.map((letters: string[], idx: number) => (
        <Word key={idx} letters={letters} />
      ))}
    </animated.div>
  );
};

export default SpringBoard;
