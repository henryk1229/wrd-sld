import { styled } from '@stitches/react';
import { SpringValue, animated } from '@react-spring/web';
import { useWindowListener } from '../hooks/useWindowListener';
import Word from './word';

const CurrentWordContainer = styled(animated.div, {
  height: '84px',
  width: '720px',
  display: 'flex',
  margin: '16px',
  border: 'solid 1px #1a1a1a',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)',
  borderRadius: '3px',
  alignItems: 'center',
});

interface BoardProps {
  currentWord: string[];
  shakeStyles: {
    x: SpringValue<number>;
  };
  handleKeyboardInput: (key: string, code: string) => void;
}

const CurrentWord: React.FC<BoardProps> = (props) => {
  const { handleKeyboardInput, currentWord, shakeStyles } = props;

  // listen for keyboard input
  useWindowListener('keyup', (e: Event) => {
    if (
      'code' in e &&
      'key' in e &&
      typeof e.code === 'string' &&
      typeof e.key === 'string'
    ) {
      const { code, key } = e;
      handleKeyboardInput(key, code);
    }
  });

  // TODO -
  // - anchor tiles
  // - add empty tile to prompt user to type?
  return (
    <CurrentWordContainer
      autoFocus={true}
      className="currentWord"
      style={{
        ...shakeStyles,
      }}
    >
      <Word letters={currentWord} isCurrentWord />
    </CurrentWordContainer>
  );
};

export default CurrentWord;
