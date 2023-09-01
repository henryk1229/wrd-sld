import express from 'express';
import { wordGenerator } from './word-generator.js';
import cors from 'cors';
import { spellcheckWord } from './spellchecker.js';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  const randomWord = wordGenerator();
  res.send({ randomWord });
});

app.post('/spellcheck', (req, res) => {
  const submittedWord = req.body.submittedWord;
  const isValidWord = spellcheckWord(submittedWord);
  res.send({ valid: isValidWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
