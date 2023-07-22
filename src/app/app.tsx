// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Header from './header';
import SpringBoard from './spring-board';

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
      <SpringBoard />
    </>
  );
}

export default App;
