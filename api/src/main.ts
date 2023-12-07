import express from 'express';
import cors from 'cors';
import config from './config';
import { spellcheckWord } from './spellchecker';
import { pgPool, query } from './db';
import { saladGenerator } from './salad-calculator';
import { wordGenerator } from './word-generator';
import expressSession from 'express-session';
import pgSession from 'connect-pg-simple';
import { v4 as uuidV4 } from 'uuid';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const { sessionSecret } = config;

const PgSession = pgSession(expressSession);

const app = express();

app.enable('trust proxy'); // TODO - set vs. enable?
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
app.use(
  expressSession({
    secret: sessionSecret,
    cookie: {
      httpOnly: true, // no access from js
      secure: false, // config.isProduction,
      maxAge: 365 * 24 * 60 * 60 * 1000, // one year
    },
    store: new PgSession({
      pool: pgPool,
      createTableIfMissing: false,
      // errorLog: (...args) => logger.error(...args),
      pruneSessionInterval: config.isTest ? false : 60,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// !!! TODO - determine how to establish session_id <-> user_id !!!

// TODO - handle fetch errors
app.get('/', async (req, res) => {
  // if (!req.session.id) {
  //   req.session.id = uuidV4();
  // }
  console.log({ req });
  const { rows } = await query({
    text: 'select * from salads order by salad_number desc limit 1',
  });
  // get the last entry from the query
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

app.get('/generate-salad', async (_req, res) => {
  const { rows } = await query({
    text: 'select initial_word from salads',
  });
  // query existing words
  const usedWords = rows?.map((row) => row.initial_word);
  // generate unused initial word
  const initialWord = wordGenerator(usedWords);

  let solutionString: string | undefined = undefined;

  while (!solutionString) {
    // generate word salads from new word
    const wordSalads = saladGenerator(initialWord);
    if (wordSalads.length > 0) {
      solutionString = wordSalads;
    }
  }

  // catch empty solution set
  if (!solutionString) {
    throw new Error('Failed to generate a solution set');
  }

  // insert into postgres
  const current_date = new Date();
  const yyyyMmDd = current_date.toISOString().split('T')[0];
  const formatted = `${yyyyMmDd} 00:00:00`;
  await query({
    text: 'insert into salads (initial_word, par, date, solution_set) values ($1, 6, $2, $3)',
    params: [initialWord, formatted, solutionString],
  });
  res.send({ initialWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
