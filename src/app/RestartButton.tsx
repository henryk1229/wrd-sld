import { styled } from '@stitches/react';
import LettersBankTile from './letters-bank-tile';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.85,
    cursor: 'pointer',
  },
});

interface Props {
  disabled: boolean;
  restartGame: () => void;
}

// renders a stylized restart button
const RestartButton: React.FC<Props> = ({ disabled, restartGame }) => (
  <StyledButton onClick={restartGame} disabled={disabled}>
    {'START'.split('').map((letter, idx) => (
      <LettersBankTile
        key={`letter-${letter}-${idx}`}
        letter={letter}
        isUsedLetter={false}
      />
    ))}
    {' OVER'.split('').map((letter, idx) => (
      <LettersBankTile
        key={`letter-${letter}-${idx}`}
        letter={letter}
        isUsedLetter={idx === 0}
      />
    ))}
  </StyledButton>
);

export default RestartButton;
