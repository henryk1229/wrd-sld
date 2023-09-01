import { useTrail } from '@react-spring/web';
import Tile from './tile';

const DURATION = 100;

interface WordCaddyProps {
  currentWord: string[];
}

const WordCaddy: React.FC<WordCaddyProps> = ({ currentWord }) => {
  const trails = useTrail(currentWord.length, {
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: DURATION,
    },
  });

  return (
    <div style={{ display: 'flex' }}>
      {trails.map((spring, idx) => {
        return (
          <Tile
            key={idx}
            letter={currentWord[idx]}
            isCurrentWord
            spring={spring}
            isAnchorTile={idx === 0}
          />
        );
      })}
    </div>
  );
};

export default WordCaddy;
