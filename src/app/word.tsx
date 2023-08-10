import { useTrail } from '@react-spring/web';
import Tile from './tile';

const DURATION = 100;

interface WordProps {
  letters: string[];
  isCurrentWord: boolean;
}

const Word = (props: WordProps) => {
  const { letters, isCurrentWord } = props;

  const trails = useTrail(letters.length, {
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: DURATION,
    },
  });

  return isCurrentWord ? (
    <>
      {trails.map((spring, idx) => {
        return (
          <Tile
            key={idx}
            letter={letters[idx]}
            isCurrentWord={isCurrentWord}
            spring={spring}
            isAnchorTile={idx === 0}
          />
        );
      })}
    </>
  ) : (
    <>
      {letters.map((letter, idx) => (
        <Tile
          key={idx}
          letter={letter}
          isCurrentWord={isCurrentWord}
          isAnchorTile={idx === 0}
        />
      ))}
    </>
  );
};

export default Word;
