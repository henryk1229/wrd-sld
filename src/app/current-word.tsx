import { animated } from '@react-spring/web';
import { useWindowListener } from '../hooks/useWindowListener';
import Word from './word';

interface BoardProps {
  currentWord: string[];
  handleKeyboardInput: (key: string, code: string) => void;
}

const CurrentWord: React.FC<BoardProps> = (props) => {
  const { handleKeyboardInput, currentWord } = props;

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

  const tempStyles = {
    display: 'flex',
    margin: '16px',
    boxShadow: '10px 10px 5px lightgray',
    borderRadius: '2px',
  };

  // TODO -
  // - anchor tile
  // - spring to shake component on bad submit
  // - add empty tile to prompt user to type?
  return (
    <animated.div autoFocus={true} className="currentWord" style={tempStyles}>
      <Word letters={currentWord} isCurrentWord />
    </animated.div>
  );
};

export default CurrentWord;
