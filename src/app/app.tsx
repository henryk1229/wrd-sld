// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './header';

import Board from './board';

export function App() {
  return (
    <>
      <CssBaseline />
      <Header />

      <Container className="board" maxWidth="lg">
        <Board />
      </Container>
    </>
  );
}

export default App;
