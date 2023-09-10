import { useTrail } from '@react-spring/web';
import WordCaddyTile from './word-caddy-tile';

const DURATION = 100;

interface WordCaddyProps {
  currentWord: string[];
  isLastWord: boolean;
}

const WordCaddy: React.FC<WordCaddyProps> = ({ currentWord, isLastWord }) => {
  const trails = useTrail(currentWord.length, {
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: DURATION,
    },
  });

  // highlight first and last letter of app name in header component
  const isMountedInHeader = currentWord.join('') === 'wordsalad';

  return (
    <div style={{ display: 'flex' }}>
      {trails.map((spring, idx) => {
        const isAnchorTile = isLastWord
          ? isMountedInHeader
            ? [0, 8].includes(idx)
            : [0, 4].includes(idx)
          : idx === 0;
        return (
          <WordCaddyTile
            key={idx}
            letter={currentWord[idx]}
            spring={spring}
            isAnchorTile={isAnchorTile}
          />
        );
      })}
    </div>
  );
};

export default WordCaddy;
