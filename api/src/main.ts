import express from 'express';
import cors from 'cors';
import config from './config';
import { spellcheckWord } from './spellchecker';
import { query } from './db';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: (_, callback) => {
      callback(null, config.allowedOrigins);
    },
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO - handle fetching errors
app.get('/', async (_req, res) => {
  const current_date = new Date();
  const yyyyMmDd = current_date.toISOString().split('T')[0];
  // salads.date = postgres current_date fn
  const formatted = `${yyyyMmDd} 00:00:00`;
  const { rows } = await query({
    text: 'select * from salads where salads.date = $1',
    params: [formatted],
  });
  // while in dev mode, allow multiple games per day
  const latestSalad = rows[rows.length - 1];
  if (latestSalad) {
    res.send({ salad: latestSalad });
  }
});

app.post('/spellcheck', (req, res) => {
  const submittedWord = req.body.submittedWord;
  const isValidWord = spellcheckWord(submittedWord);
  res.send({ valid: isValidWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
