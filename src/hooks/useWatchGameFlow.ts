import { useEffect } from 'react';

export const useWatchGameFlow = ({
  isWordSalad,
  isLostGame,
  isBadAttempt,
  displayToast,
  restartGame,
  setStatsModalOpen,
}: {
  isWordSalad: boolean;
  isLostGame: boolean;
  isBadAttempt: boolean;
  displayToast: () => void;
  restartGame: () => void;
  setStatsModalOpen: (bool: boolean) => void;
}) => {
  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;
    let modalTimeout: NodeJS.Timeout;
    if (isWordSalad) {
      modalTimeout = setTimeout(() => setStatsModalOpen(true), 800);
      return;
    }
    if (isLostGame) {
      toastTimeout = setTimeout(() => displayToast(), 1800);
      modalTimeout = setTimeout(() => setStatsModalOpen(true), 2200);
      return;
    }
    if (isBadAttempt) {
      toastTimeout = setTimeout(() => displayToast(), 1600);
      modalTimeout = setTimeout(() => restartGame(), 2800);
    }
    return () => {
      toastTimeout && clearTimeout(toastTimeout);
      modalTimeout && clearTimeout(modalTimeout);
    };
  }, [
    isWordSalad,
    isBadAttempt,
    isLostGame,
    restartGame,
    displayToast,
    setStatsModalOpen,
  ]);
};
