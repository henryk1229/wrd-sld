import { animated, useSpring } from '@react-spring/web';
import Board from './board';
import { useState } from 'react';

// This component rotates board when a word is submitted
const SpringBoard: React.FC = () => {
  // TODO - can this be simplified?
  // keep board orientation in sync with submitted words
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] = JSON.parse(storedWords);
  const [wordCount, setWordCount] = useState(submittedWords.length);
  const fromDegree = -90 * (wordCount - 1);
  const toDegree = -90 * wordCount;

  // TODO - can this dupe be removed?
  const from = { transform: `rotate(${fromDegree}deg)` };

  const [springs, api] = useSpring(() => ({
    from,
  }));

  const rotateBoard = (wordCount: number) => {
    setWordCount(wordCount);
    api.start({
      from,
      to: {
        transform: `rotate(${toDegree}deg)`,
      },
    });
  };

  const tempStyles = {
    width: 720,
    height: 600,
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
      <Board submittedWords={submittedWords} rotateBoard={rotateBoard} />
    </animated.div>
  );
};

export default SpringBoard;
