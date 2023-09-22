// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { styled } from '@stitches/react';
import Board from './board';
import Header from './header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { camelCase } from 'change-case';

const URL = 'http://localhost:3000/';

const AppContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
});

export type DailySalad = {
  id: string;
  date: string;
  initialWord: string;
  par: number;
  saladNumber: number;
};

// TODO - refactor localStorage strategy
const setSaladInStorage = (dailySalad: DailySalad | null) => {
  if (dailySalad) {
    // const current_date = new Date();
    // const yyyyMmDd = current_date.toISOString().split('T')[0];
    // const rowDate = dailySalad.date.split('T')[0];
    // const gameInPlay = localStorage.getItem(`${yyyyMmDd}`);
    // track submitted words, scoped to game
    // localStorage.setItem(`${rowDate}`, JSON.stringify([]));
  }
};

// TODO - error handling
const fetchDailySalad = async () => {
  return await axios({
    method: 'get',
    url: URL,
  }).then((result) => {
    const { dailySalad } = result.data;
    const camelCased: DailySalad = Object.keys(dailySalad).reduce(
      (acc, key) => ({
        ...acc,
        [camelCase(key)]: dailySalad[key],
      }),
      {
        id: '',
        date: '',
        initialWord: '',
        par: 0,
        saladNumber: 0,
      }
    );
    return camelCased;
  });
};

export function App() {
  const [dailySalad, setSalad] = useState<DailySalad | null>(null);
  setSaladInStorage(dailySalad);

  useEffect(() => {
    fetchDailySalad().then((salad: DailySalad) => {
      setSalad(salad);
    });
  }, []);

  return (
    <AppContainer>
      <Header />
      {dailySalad ? <Board dailySalad={dailySalad} /> : null}
    </AppContainer>
  );
}

export default App;
