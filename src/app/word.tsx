import Tile from './tile';

interface WordProps {
  letters: string[];
  isCurrentWord?: boolean;
}

const Word = (props: WordProps) => {
  return (
    <>
      {props.letters.map((letter, idx) => (
        <Tile key={idx} letter={letter} />
      ))}
    </>
  );
};

export default Word;
