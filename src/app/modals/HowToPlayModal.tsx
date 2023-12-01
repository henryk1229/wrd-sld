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

export type GameStats = {
  date: string;
  saladNumber: number;
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
          width: '44%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader>
        {'HOW TO PLAY'.split('').map((letter, idx) => (
          <ModalTile key={`${letter}-${idx}`}>{letter}</ModalTile>
        ))}
      </ModalHeader>
      <ModalSubHeader>Complete the WordSalad in four words</ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li style={{ margin: '8px' }}>
            Each word must be <span style={{ fontWeight: 600 }}>five</span>{' '}
            letters
          </li>
          <li style={{ margin: '8px' }}>
            Each word must start with the{' '}
            <span style={{ fontWeight: 600 }}>last letter</span> of the
            preceding word
          </li>
          <li style={{ margin: '8px' }}>
            Each letter can be used only{' '}
            <span style={{ fontWeight: 600 }}>once</span> per WordSalad
          </li>
          <li style={{ margin: '8px' }}>
            The <span style={{ fontWeight: 600 }}>number</span> next to each row
            shows the remaining word combinations
          </li>
        </ul>
      </ModalContent>
      <ModalSubHeader>Examples</ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li
            style={{
              margin: '12px 8px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            <span style={{ textDecoration: 'underline' }}>A</span>BCD
            <span style={{ textDecoration: 'underline' }}>E</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>E</span>
            FGH
            <span style={{ textDecoration: 'underline' }}>I</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>I</span>
            JKL
            <span style={{ textDecoration: 'underline' }}>M</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>M</span>
            LNOP
          </li>
          <li
            style={{
              margin: '12px 8px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            <span style={{ textDecoration: 'underline' }}>C</span>DEF
            <span style={{ textDecoration: 'underline' }}>G</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>G</span>
            HIJ
            <span style={{ textDecoration: 'underline' }}>K</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>K</span>
            LMN
            <span style={{ textDecoration: 'underline' }}>O</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>O</span>
            PQRS
          </li>
          <li
            style={{
              margin: '12px 8px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            <span style={{ textDecoration: 'underline' }}>E</span>FGH
            <span style={{ textDecoration: 'underline' }}>I</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>I</span>
            JKL
            <span style={{ textDecoration: 'underline' }}>M</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>M</span>
            NOP
            <span style={{ textDecoration: 'underline' }}>Q</span>,{' '}
            <span style={{ textDecoration: 'underline' }}>Q</span>
            RSTU
          </li>
        </ul>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;
