import { animated, useSpring } from '@react-spring/web';

interface SpringBoardProps {
  children: React.ReactElement[];
}

// This component should handle transition when a user enters a word
const SpringBoard = (props: SpringBoardProps) => {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

  const tempStyles = {
    width: 1024,
    height: 728,
    // background: '#ff6d6d',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 4,
    margin: 4,
  };

  return (
    <animated.div
      style={{
        ...tempStyles,
        ...springs,
      }}
    >
      {props.children}
    </animated.div>
  );
};

export default SpringBoard;
