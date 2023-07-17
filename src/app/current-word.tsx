import Tile from './tile';

interface CurrentWordProps {
  letters: string[];
}

const CurrentWord = (props: CurrentWordProps) => {
  return (
    <>
      {props.letters.map((letter, idx) => (
        <Tile key={idx} letter={letter} />
      ))}
    </>
  );
};

export default CurrentWord;
