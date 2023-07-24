import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import Word from './word';

const APP_NAME = ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];

const HeaderContainer = styled(animated.div, {
  height: '96px',
  width: '960px',
  display: 'flex',
  margin: '16px',
  border: 'solid 1px #1a1a1a',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)',
  borderRadius: '3px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Chip = styled('div', {
  display: 'flex',
  margin: '16px',
  padding: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Helvetica',
});

const Header: React.FC = () => (
  <HeaderContainer className="header">
    <div style={{ display: 'flex' }}>
      <Word letters={APP_NAME} isCurrentWord />
    </div>
    <Chip>by hhk</Chip>
  </HeaderContainer>
);

export default Header;
