import { styled } from '@stitches/react';
import { animated } from '@react-spring/web';
import WordCaddy from './WordCaddy';

const APP_NAME = ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];

const HeaderContainer = styled(animated.div, {
  display: 'flex',
  marginTop: '16px',
  padding: '8px 8px 0px 16px',
  justifyContent: 'space-evenly',
});

const Chip = styled('div', {
  display: 'flex',
  marginLeft: '16px',
  padding: '8px 4px 4px 72px',
  alignItems: 'end',
  fontFamily: 'Helvetica',
  borderBottom: 'solid 1px',
});

const Header: React.FC = () => (
  <HeaderContainer className="header">
    <WordCaddy currentWord={APP_NAME} isLastWord={true} />
    <Chip>by hhk</Chip>
  </HeaderContainer>
);

export default Header;
