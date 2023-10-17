import { styled } from '@stitches/react';
import { useState } from 'react';
import StatsModal, { Stats } from './StatsModal';

const DisplayContainer = styled('div', {
  width: '320px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const DisplayContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  color: '#217C7E',
});

interface Props {
  stats: Stats;
}

const StatsDisplay: React.FC<Props> = ({ stats }) => {
  const { attempts, ranking, par } = stats;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <DisplayContainer>
      <DisplayContent>
        <div style={{ margin: '4px' }}>Attempts: {attempts}</div>
        <div style={{ margin: '4px' }}>Par: {par}</div>
        <div
          style={{ margin: '4px', cursor: 'pointer' }}
          onClick={() => setModalOpen(true)}
        >
          Current Rank: {ranking}
        </div>
      </DisplayContent>
      <StatsModal
        stats={stats}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </DisplayContainer>
  );
};

export default StatsDisplay;
