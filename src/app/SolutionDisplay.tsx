import { SpringValue, animated } from '@react-spring/web';
import { styled } from '@stitches/react';

const SpringBoardTile = styled(animated.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  color: 'black',
  height: '48px',
  width: '8px',
  marginBottom: '31px',
});

interface Props {
  playedWords: string[][];
  solutionSet: string;
  spring?: {
    transform: SpringValue<string>;
  };
}

// returns an array of sets containing remaining words to play
const makeSolutionSets = (playedWords: string[][], solutionSet: string) => {
  const filterString = playedWords.map((word) => word.join('')).join(',');
  const solutionsArray = solutionSet?.split('-') ?? [];
  const filtered = solutionsArray.filter((set) => {
    return set.includes(filterString);
  });
  const remainders = filtered.map((set) => {
    const slice = set.split(',').slice(playedWords.length);
    return slice;
  });
  const numToCreate = 4 - playedWords.length;
  const sets = Array.from(Array(numToCreate), (_arr) => new Set());
  remainders.forEach((wordArray) => {
    wordArray.forEach((word, idx) => {
      const set = sets[idx];
      if (set) {
        set.add(word);
      }
    });
  });
  return [...sets];
};

const SolutionDisplay: React.FC<Props> = ({
  playedWords,
  solutionSet,
  spring,
}) => {
  const solutionSets = makeSolutionSets(playedWords, solutionSet);
  return (
    <div
      style={{
        height: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {solutionSets.map((set, idx) => (
        <SpringBoardTile key={`${set.size}-${idx}`} style={{ ...spring }}>
          {set.size}
        </SpringBoardTile>
      ))}
    </div>
  );
};

export default SolutionDisplay;
