import { styled } from '@stitches/react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import LettersBankTile from './LettersBankTile';

const ModalHeader = styled('h3', {
  display: 'flex',
  margin: '16px',
  fontSize: '20px',
  fontWeight: 900,
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

export type GameStats = {
  date: string;
  saladNumber: number;
  par: number;
  attempts: number;
  ranking: string;
  initialWord: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="end-game-modal"
      aria-describedby="modal-indicating-game-over"
      styles={{
        modal: {
          width: '40%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader>
        {'How To PLay'.split('').map((letter) => (
          <LettersBankTile letter={letter} isUsedLetter={!letter} />
        ))}
      </ModalHeader>
      <ModalSubHeader>Complete the WordSalad in four words</ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li style={{ margin: '8px' }}>
            The first word has been chosen for you
          </li>
          <li style={{ margin: '8px' }}>
            Each word must start with the last letter of the preceding word
          </li>
          <li style={{ margin: '8px' }}>
            The last word ends with the first letter of the first word
          </li>
          <li style={{ margin: '8px' }}>
            Each letter can be used only{' '}
            <span style={{ fontWeight: 600 }}>once</span> per WordSalad
          </li>
          <li style={{ margin: '8px' }}>Each word must be five letters</li>
        </ul>
      </ModalContent>
      <ModalSubHeader>Examples</ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li style={{ margin: '8px', fontWeight: 600, letterSpacing: '2px' }}>
            <span style={{ textDecoration: 'underline' }}>a</span>bcd
            <span style={{ textDecoration: 'underline' }}>e</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>e</span>
            fgh
            <span style={{ textDecoration: 'underline' }}>i</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>i</span>
            jkl
            <span style={{ textDecoration: 'underline' }}>m</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>m</span>
            lno
            <span style={{ textDecoration: 'underline' }}>a</span>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;
