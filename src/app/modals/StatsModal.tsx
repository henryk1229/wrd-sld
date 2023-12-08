import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { retrieveLSData } from '../GameLayer';
import { DailySalad } from '../app';

const ModalHeader = styled('h3', {
  display: 'flex',
  margin: '8px 16px',
  fontSize: '20px',
  fontWeight: 800,
});

const ModalSubHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 16px 0px',
  color: '#217C7E',
  fontSize: '16px',
  fontWeight: 600,
});

const ModalContentWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 16px',
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '16px',
});

const ModalTile = styled('div', {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '1px 1px #751213',
  border: 'solid 1px',
  borderColor: '#9A3334 #751213 #751213 #9A3334',
  color: '#fafafa',
  width: '28px',
  height: '36px',
  margin: '4px 2px',
  backgroundColor: '#9A3334',
});

export type SaladData = Pick<DailySalad, 'date' | 'saladNumber'>;

interface Props {
  saladDate: string;
  saladNumber: number;
  open: boolean;
  isWordSalad: boolean;
  isLostGame: boolean;
  onClose: () => void;
}

const getSuffix = (lastDigit: string) => {
  const asNumber = parseInt(lastDigit, 10);
  // 1st, 2nd, 3rd
  if (asNumber === 1) {
    return 'st';
  }
  if (asNumber === 2) {
    return 'nd';
  }
  if (asNumber === 3) {
    return 'rd';
  }

  // 4th, 5th, 6th, 10th
  return 'th';
};
// take '2023-10-19T04:00:00' and return October 19th, 2023
const formatDate = (date: string) => {
  const splitYear = date.split('-');
  const year = splitYear[0];
  const numberedMonth = splitYear[1];
  const monthMap: { [x: string]: string } = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };
  const month = monthMap[numberedMonth];
  const numberedDay = splitYear[2]?.split('T')[0];
  const splitDay = numberedDay.split('');
  const lastDigit = splitDay[splitDay.length - 1];
  const suffix = getSuffix(lastDigit);
  return `${month} ${numberedDay}${suffix}, ${year}`;
};

const StatsModal: React.FC<Props> = ({
  saladDate,
  saladNumber,
  open,
  isLostGame,
  isWordSalad,
  onClose,
}) => {
  const { storedStats: userStats } = retrieveLSData(saladNumber);
  const { played, gamesWon, currentStreak, maxStreak } = userStats;
  const formattedDate = formatDate(saladDate);
  const winPercentage = played ? (gamesWon / played) * 100 : 0;
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="stats-modal"
      aria-describedby="modal-displaying-stats"
      styles={{
        modal: {
          width: '36%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader>
        {`SALAD ${saladNumber}`.split('').map((letter, idx) => (
          <ModalTile key={`${letter}-${idx}`}>{letter}</ModalTile>
        ))}
      </ModalHeader>
      <ModalSubHeader>{formattedDate}</ModalSubHeader>
      <ModalSubHeader
        style={{ color: 'black', marginTop: '16px', fontSize: '18px' }}
      >
        Statistics
      </ModalSubHeader>
      <ModalContentWrapper>
        <ModalContent>
          <div style={{ fontSize: '40px' }}>{played}</div>
          <div>Played</div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '40px' }}>{winPercentage}</div>
          <div>Win % </div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '40px' }}>{currentStreak}</div>
          <div>Win Streak</div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '40px' }}>{maxStreak}</div>
          <div>Max Streak</div>
        </ModalContent>
      </ModalContentWrapper>
    </Modal>
  );
};

export default StatsModal;
