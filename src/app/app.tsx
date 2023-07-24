// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { styled } from '@stitches/react';
import Board from './board';
import Header from './header';

const AppContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
});

const mockInitialWordFetch = () => {
  const submittedWords = localStorage.getItem('submittedWords');
  if (!submittedWords) {
    // words are an array of letters
    const dummyWord = ['m', 'e', 'r', 'i', 't'];
    // submitted words is an array of word arrays
    localStorage.setItem('submittedWords', JSON.stringify([dummyWord]));
  }
};

export function App() {
  // TODO - generate + serve first word
  mockInitialWordFetch();

  return (
    <AppContainer>
      <Header />
      <Board />
    </AppContainer>
  );
}

export default App;
