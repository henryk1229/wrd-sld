import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import WordCaddy from './word-caddy';

const APP_NAME = ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];

const HeaderContainer = styled(animated.div, {
  height: '96px',
  width: '960px',
  display: 'flex',
  margin: '16px',
  alignItems: 'center',
  justifyContent: 'space-evenly',
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
    <WordCaddy currentWord={APP_NAME} isLastWord={true} />
    <Chip>by hhk</Chip>
  </HeaderContainer>
);

export default Header;
