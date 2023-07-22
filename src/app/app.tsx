// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Board from './board';
import Header from './header';

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
    <>
      <Header />
      <Board />
    </>
  );
}

export default App;
