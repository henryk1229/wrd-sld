import { styled } from '@stitches/react';
import { SpringValue, animated } from '@react-spring/web';
import { useWindowListener } from '../hooks/useWindowListener';
import WordCaddy from './WordCaddy';

const CurrentWordContainer = styled(animated.div, {
  height: '84px',
  width: '400px',
  display: 'flex',
  borderRadius: '3px',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

interface BoardProps {
  currentWord: string[];
  shakeStyles: {
    x: SpringValue<number>;
  };
  isLastWord: boolean;
  handleKeyboardInput: (key: string, code: string) => void;
}

const CurrentWord: React.FC<BoardProps> = ({
  currentWord,
  shakeStyles,
  isLastWord,
  handleKeyboardInput,
}) => {
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

  return (
    <CurrentWordContainer
      autoFocus={true}
      className="currentWord"
      style={{
        ...shakeStyles,
      }}
    >
      <WordCaddy currentWord={currentWord} isLastWord={isLastWord} />
    </CurrentWordContainer>
  );
};

export default CurrentWord;
