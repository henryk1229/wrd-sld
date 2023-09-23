import { styled } from '@stitches/react';

const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const StyledButton = styled('button', {
  boxShadow: '0.5px 0.5px black',
  borderRadius: '3px',
  // width: '64px',
  height: '64px',
  margin: '8px',
  backgroundColor: '#9A3334',
  alignItems: 'center',
  color: '#FFCC00',
  '&:hover': {
    opacity: 0.85,
    cursor: 'pointer',
  },
  fontFamily: 'Helvetica',
  fontWeight: 600,
});

interface Props {
  restartGame: () => void;
}

const RetryButton: React.FC<Props> = ({ restartGame }) => (
  <ButtonContainer>
    <StyledButton onClick={restartGame}>RESTART</StyledButton>
  </ButtonContainer>
);

export default RetryButton;
