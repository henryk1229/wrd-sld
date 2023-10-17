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
  margin: '16px',
  color: '#217C7E',
  fontSize: '18px',
  fontWeight: 600,
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 16px',
  // fontWeight: 500,
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
          width: '48%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          // fontWeight: 500,
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
        <li style={{ margin: '4px' }}>
          The first word has been chosen for you
        </li>
        <li style={{ margin: '4px' }}>
          The next word must start with the last letter of the preceding word
        </li>
        <li style={{ margin: '4px' }}>
          The last word ends with the last letter of the first word
        </li>
        <li style={{ margin: '4px' }}>
          Each letter can be used only{' '}
          <span style={{ fontStyle: 'italic' }}>once</span> per WordSalad
        </li>
        <li style={{ margin: '4px' }}>Each word must be five letters</li>
      </ModalContent>
      <ModalSubHeader>Examples</ModalSubHeader>
      <ModalContent>
        <li style={{ margin: '4px', fontWeight: 500 }}>
          "
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            a
          </span>
          bcd
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            e
          </span>
          ", "
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            e
          </span>
          fgh
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            i
          </span>
          ", "
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            i
          </span>
          jkl
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            m
          </span>
          ", "
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            m
          </span>
          lno
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            a
          </span>
          "
        </li>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;
