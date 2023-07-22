interface TileProps {
  letter: string;
}

// TODO - useSpring for animation here?

const Tile = (props: TileProps) => {
  return <div>{props.letter.toUpperCase()}</div>;
};

export default Tile;
