// import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// TODO - styling
// const ModalContent = styled('div', {
//   fontFamily: 'Helvetica',
//   fontWeight: 800,
// });

interface Props {
  open: boolean;
  onClose: () => void;
}

const EndGameModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="end-game-modal"
      aria-describedby="modal-indicating-game-over"
      styles={{
        modal: {
          width: '100%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          fontWeight: 800,
        },
      }}
      // showCloseIcon={false}
      focusTrapped={false}
    >
      <h3>You won WordSalad!</h3>
      <div>Nice</div>
    </Modal>
  );
};

export default EndGameModal;
