import { styled } from '@stitches/react';
import { Tooltip } from 'react-tooltip';
import StatsModal, { Stats } from './StatsModal';
import HelpButton from '../HelpButton';

const DisplayContainer = styled('div', {
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

const AttemptBadge = styled('div', {
  color: 'black',
  height: '4px',
  width: '4px',
  backgroundColor: 'black',
  margin: '4px',
  border: '2px solid black',
  borderRadius: '50%',
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{ margin: '4px', cursor: 'pointer' }}
            onClick={() => setStatsModalOpen(true)}
          >
            Current Rank: <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
          <div style={{ margin: '4px' }}>Par: {par}</div>
          <div style={{ margin: '4px' }}>
            <HelpButton onClick={() => setHTPModalOpen(true)} />
          </div>
        </div>
        <div style={{ display: 'flex', margin: '0px 4px' }}>
          {attempts.length > 0 ? (
            attempts.map((attempt, idx) => (
              <AttemptBadge
                key={idx}
                data-tooltip-id={`attempt-tooltip-${idx}`}
              >
                <Tooltip
                  id={`attempt-tooltip-${idx}`}
                  place="bottom"
                  opacity={0.6}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {attempt.map((word) => (
                      <div style={{ marginBottom: '2px' }} key={word}>
                        {word.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </Tooltip>
              </AttemptBadge>
            ))
          ) : (
            <AttemptBadge />
          )}
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
