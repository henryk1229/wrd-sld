import Tile from './tile';
interface WordProps {
  letters: string[];
  isCurrentWord: boolean;
}

const Word = (props: WordProps) => {
  const { letters, isCurrentWord } = props;

  return (
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
