import { styled } from '@stitches/react';
import { useState } from 'react';
import StatsModal, { Stats } from './StatsModal';
import HelpButton from '../HelpButton';
import HowToPlayModal from '../HowToPlayModal';

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
  justifyContent: 'left',
});

interface Props {
  stats: Stats;
}

const StatsDisplay: React.FC<Props> = ({ stats }) => {
  const { attempts, ranking, par } = stats;
  const [statsModalOpen, setStatsModalOpen] = useState<boolean>(false);
  const [howToPlayModalOpen, setHTPModalOpen] = useState<boolean>(false);

  return (
    <DisplayContainer>
      <DisplayContent>
        <div
          style={{ margin: '4px', cursor: 'pointer' }}
          onClick={() => setStatsModalOpen(true)}
        >
          Current Rank:{' '}
          <span
            style={{
              color: '#217C7E',
            }}
          >
            {ranking}
          </span>
        </div>
        <div style={{ margin: '4px' }}>Par: {par}</div>
        <div style={{ margin: '4px' }}>Attempts: {attempts}</div>
        <div style={{ margin: '4px 0px' }}>
          <HelpButton onClick={() => setHTPModalOpen(true)} />
        </div>
      </DisplayContent>
      <StatsModal
        stats={stats}
        open={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
      />
      <HowToPlayModal
        open={howToPlayModalOpen}
        onClose={() => setHTPModalOpen(false)}
      />
    </DisplayContainer>
  );
};

export default StatsDisplay;
