import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
});

interface Props {
  disabled: boolean;
  onClick: () => void;
}

// renders a stylized restart button
const EnterButton: React.FC<Props> = ({ disabled, onClick }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    <ArrowUp />
  </StyledButton>
);

const ArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke={'#9A3334'}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V6M5 12l7-7 7 7" />
  </svg>
);

export default EnterButton;
