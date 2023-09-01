// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { styled } from '@stitches/react';
import Board from './board';
import Header from './header';
import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = 'http://localhost:3000/';

const AppContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
});

const setWordInStorage = (initialWord: string[]) => {
  const submittedWords = localStorage.getItem('submittedWords');
  if (!submittedWords && initialWord.length > 0) {
    // submitted words is an array of word arrays
    localStorage.setItem('submittedWords', JSON.stringify([initialWord]));
  }
};

const fetchInitialWord = async () => {
  return await axios({
    method: 'get',
    url: URL,
  }).then((result) => result.data.randomWord);
};

export function App() {
  // TODO - keep initial word and fetched word in sync
  const [initialWord, setInitialWord] = useState<string[]>([]);
  setWordInStorage(initialWord);

  useEffect(() => {
    fetchInitialWord().then((word) => {
      setInitialWord(word);
    });
  }, []);

  const shouldMountBoard = initialWord.length > 0;

  return (
    <AppContainer>
      <Header />
      {shouldMountBoard && <Board />}
    </AppContainer>
  );
}

export default App;
