import { styled } from '@stitches/react';
import LettersBankTile from './LettersBankTile';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
});

interface Props {
  disabled: boolean;
  restartGame: () => void;
}

// renders a stylized restart button
const RestartButton: React.FC<Props> = ({ disabled, restartGame }) => (
  <StyledButton
    onClick={restartGame}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    {'START'.split('').map((letter, idx) => (
      <LettersBankTile
        key={`letter-${letter}-${idx}`}
        letter={letter}
        isUsedLetter={false}
        isStatsDisplay={true}
      />
    ))}
    {' OVER'.split('').map((letter, idx) => (
      <LettersBankTile
        key={`letter-${letter}-${idx}`}
        letter={letter}
        isUsedLetter={idx === 0}
        isStatsDisplay={true}
      />
    ))}
  </StyledButton>
);

export default RestartButton;
