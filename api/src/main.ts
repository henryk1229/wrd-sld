import express from 'express';
import { wordGenerator } from './word-generator.js';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  const randomWord = wordGenerator();
  res.send({ randomWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
