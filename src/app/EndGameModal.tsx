import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '16px',
  color: '#217C7E',
});

const ModalHeader = styled('h3', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export type GameStats = {
  date: string;
  saladNumber: number;
  par: number;
  attempts: number;
  ranking: string;
  initialWord: string;
};

interface Props {
  stats: GameStats;
  open: boolean;
  onClose: () => void;
}

const EndGameModal: React.FC<Props> = ({ stats, open, onClose }) => {
  const { date, saladNumber, par, attempts, ranking, initialWord } = stats;
  const dateObj = new Date(date);
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="end-game-modal"
      aria-describedby="modal-indicating-game-over"
      styles={{
        modal: {
          width: '32%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          fontWeight: 800,
          color: '#9A3334',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader>
        WordSalad #{saladNumber} - {dateObj.toDateString()}
      </ModalHeader>
      <ModalContent>
        <div style={{ margin: '8px' }}>Initial Word: {initialWord}</div>
        <div style={{ margin: '8px' }}>Par: {par}</div>
        <div style={{ margin: '8px' }}>Attempts: {attempts}</div>
        <div style={{ margin: '8px' }}>Ranking: {ranking}</div>
      </ModalContent>
    </Modal>
  );
};

export default EndGameModal;
