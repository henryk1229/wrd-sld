import { SpringValue, useSpring } from '@react-spring/web';
import { useState } from 'react';

export interface Spring {
  transform: SpringValue<string>;
}

export const useRotateBoard = (submittedWordsLength: number) => {
  const [wordCount, setWordCount] = useState(submittedWordsLength);
  const fromDegree = -90 * (wordCount - 1);
  const toDegree = -90 * wordCount;

  // TODO - can this dupe be removed?
  const from = { transform: `rotate(${fromDegree}deg)` };

  const [spring, api] = useSpring(() => ({
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
  return { spring, rotateBoard };
};
