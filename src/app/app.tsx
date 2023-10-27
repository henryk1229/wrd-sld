import { styled } from '@stitches/react';
import Header from './header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { camelCase } from 'change-case';
import GameLayer from './GameLayer';

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

// TODO - error handling
const fetchDailySalad = async () => {
  return await axios({
    method: 'get',
    url: URL,
  }).then((result) => {
    const { salad } = result.data;
    const camelCased: DailySalad = Object.keys(salad).reduce(
      (acc, key) => ({
        ...acc,
        [camelCase(key)]: salad[key],
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
  const [dailySalad, setSalad] = useState<DailySalad>({
    id: '',
    date: new Date().toISOString(),
    initialWord: '',
    par: 0,
    saladNumber: 0,
  });

  useEffect(() => {
    if (!dailySalad.id) {
      fetchDailySalad().then((salad: DailySalad) => {
        setSalad(salad);
      });
    }
  }, [dailySalad]);

  return (
    <AppContainer>
      <Header />
      <GameLayer dailySalad={dailySalad} />
    </AppContainer>
  );
}

export default App;
