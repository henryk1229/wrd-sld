import { styled } from '@stitches/react';
import StatsModal, { Stats } from './StatsModal';
import HelpButton from '../HelpButton';

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
  statsModalOpen: boolean;
  setStatsModalOpen: (bool: boolean) => void;
  setHTPModalOpen: (bool: boolean) => void;
}

const StatsDisplay: React.FC<Props> = ({
  stats,
  statsModalOpen,
  setStatsModalOpen,
  setHTPModalOpen,
}) => {
  const { attempts, ranking, par } = stats;
  return (
    <DisplayContainer>
      <DisplayContent>
        <div style={{ display: 'flex' }}>
          <div
            style={{ margin: '4px 8px', cursor: 'pointer' }}
            onClick={() => setStatsModalOpen(true)}
          >
            Current Rank: <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
          <div style={{ margin: '4px' }}>Par: {par}</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '8px',
          }}
        >
          <div style={{ margin: '4px 8px' }}>Attempts: {attempts}</div>
          <div style={{ margin: '4px' }}>
            <HelpButton onClick={() => setHTPModalOpen(true)} />
          </div>
        </div>
      </DisplayContent>
      <StatsModal
        stats={stats}
        open={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
      />
    </DisplayContainer>
  );
};

export default StatsDisplay;
