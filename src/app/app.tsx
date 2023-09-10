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
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
});

// TODO - rm after db is set up
const setWordInStorage = (initialWord: string[]) => {
  // const submittedWords = localStorage.getItem('submittedWords');
  if (initialWord.length > 0) {
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

  return (
    <AppContainer>
      <Header />
      <Board rootWord={initialWord} />
    </AppContainer>
  );
}

export default App;
