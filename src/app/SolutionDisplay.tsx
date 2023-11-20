import { SpringValue, animated, useTrail } from '@react-spring/web';
import { styled } from '@stitches/react';

const BadgeContainer = styled('div', {
  height: '360px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

const Badge = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  height: '32px',
  width: '32px',
  marginBottom: '40px',
  border: '2px solid black',
  borderRadius: '50%',
});

const BadgeContents = styled(animated.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontSize: '12px',
  color: 'black',
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
  const trails = useTrail(solutionSets.length, {
    from: { opacity: 0 },
    to: {
      opacity: 1,
    },
    config: {
      duration: 500,
    },
  });
  return (
    <BadgeContainer>
      {trails.map((trail, idx) => (
        <Badge key={`${solutionSets[idx].size}-${idx}`}>
          <BadgeContents style={{ ...trail }}>
            {solutionSets[idx].size}
          </BadgeContents>
        </Badge>
      ))}
    </BadgeContainer>
  );
};

export default SolutionDisplay;
