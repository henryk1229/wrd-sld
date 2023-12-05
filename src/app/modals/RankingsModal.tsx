import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalHeader = styled('h3', {
  display: 'flex',
  margin: '16px',
  fontSize: '20px',
  fontWeight: 800,
});

const ModalSubHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '16px 16px 0px',
  color: '#217C7E',
  fontSize: '18px',
  fontWeight: 600,
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
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
  // fontSize: '20px',
  backgroundColor: '#9A3334',
});

const AttemptBadge = styled('div', {
  color: 'black',
  height: '4px',
  width: '4px',
  backgroundColor: 'black',
  margin: '8px 8px 8px 2px',
  border: '2px solid black',
  borderRadius: '50%',
});

export type Stats = {
  date: string;
  saladNumber: number;
  attempts: string[][];
  ranking: string;
};

interface Props {
  stats: Stats;
  open: boolean;
  isWordSalad: boolean;
  isLostGame: boolean;
  onClose: () => void;
}

const RankingsModal: React.FC<Props> = ({
  stats,
  open,
  isLostGame,
  isWordSalad,
  onClose,
}) => {
  const { ranking, attempts } = stats;
  const rankingText = isWordSalad ? 'Rank:' : 'Current Rank:';
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
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader>
        {'RANKINGS'.split('').map((letter, idx) => (
          <ModalTile key={`${letter}-${idx}`}>{letter}</ModalTile>
        ))}
      </ModalHeader>
      {/* <ModalSubHeader>Ranks are based on number of attempts</ModalSubHeader> */}
      <ModalContent>
        <div style={{ margin: '4px 12px' }}>
          Ranks are based on number of attempts
        </div>
        <AttemptsDisplay attempts={attempts} />
        {!isLostGame && (
          <div style={{ margin: '4px 12px' }}>
            {rankingText} <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

// TODO
// distinguish between lost and won end games?

interface AttemptsDisplayProps {
  attempts: string[][];
}

const AttemptsDisplay: React.FC<AttemptsDisplayProps> = ({ attempts }) => {
  const rankingsObject: Record<number, string> = {
    1: 'Perfect',
    2: 'Great',
    4: 'Good',
    6: 'Normal',
  };
  // make an array of seven past attempts and any remaining attempts
  const attemptsAndRemaining = Array.from(
    Array(7),
    (_num, idx) => attempts[idx]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: '12px',
      }}
    >
      {attemptsAndRemaining.map((attempt, idx) =>
        attempt ? (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <AttemptBadge key={idx} />
            {rankingsObject[idx + 1]}
          </div>
        ) : (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <AttemptBadge
              key={idx}
              style={{
                backgroundColor: '#F3EFE0',
              }}
            />
            {rankingsObject[idx + 1]}
          </div>
        )
      )}
    </div>
  );
};

export default RankingsModal;