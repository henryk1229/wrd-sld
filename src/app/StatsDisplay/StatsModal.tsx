import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { GameStats } from '../EndGameModal';

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '16px',
  color: '#217C7E',
});

const ModalHeader = styled('h3', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export type Stats = Omit<GameStats, 'initialWord'>;

interface Props {
  stats: Stats;
  open: boolean;
  onClose: () => void;
}

const StatsModal: React.FC<Props> = ({ stats, open, onClose }) => {
  const { date, saladNumber, par, ranking } = stats;
  const dateObj = new Date(date);
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="stats-modal"
      aria-describedby="modal-displaying-stats"
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
        <div style={{ margin: '4px' }}>Par: {par}</div>
        <div style={{ margin: '4px' }}>Good: {par - 1}</div>
        <div style={{ margin: '4px' }}>Great: {par - 2}</div>
        <div style={{ margin: '4px' }}>Genius: {par - 4}</div>
        <div style={{ margin: '16px 4px 4px' }}>Current Rank: {ranking}</div>
      </ModalContent>
    </Modal>
  );
};

export default StatsModal;
