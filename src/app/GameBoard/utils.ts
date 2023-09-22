export const checkSubmitConditions = ({
  currentWord,
  playedWords,
  submittedLetters,
  isLastTurn,
}: {
  currentWord: string[];
  playedWords: string[][];
  submittedLetters: string[];
  isLastTurn: boolean;
}) => {
  const blankTileIdx = currentWord.findIndex((el) => !el);
  // check that letters in current word haven't been used, except for last letter of last word
  const nonUniqueLetters = isLastTurn
    ? currentWord.some((letter, idx) => {
        if (idx === 0) {
          return false;
        }
        // explicitly return false here, because we expect true
        if (idx === 4) {
          return false;
        }
        return submittedLetters.includes(letter);
      })
    : currentWord.some((letter, idx) =>
        idx === 0 ? false : submittedLetters.includes(letter)
      );
  // check that current word has unique letters
  const currentWordRepeatsLetters =
    new Set(currentWord).size !== currentWord.length;
  const shouldAllowSubmit = isLastTurn
    ? blankTileIdx === -1 &&
      !nonUniqueLetters &&
      !currentWordRepeatsLetters &&
      playedWords[0][4] === currentWord[4]
    : blankTileIdx === -1 && !nonUniqueLetters && !currentWordRepeatsLetters;

  return {
    shouldAllowSubmit,
  };
};

// currentWord should start with first letter of last submittedWord
export const determineFirstLetter = (playedWords: string[][]) => {
  const lastSubmittedWord = playedWords[playedWords.length - 1];
  if (lastSubmittedWord.length < 1) {
    return '';
  }
  const letter =
    playedWords.length === 1
      ? lastSubmittedWord[0]
      : lastSubmittedWord[lastSubmittedWord.length - 1];
  return letter;
};

export const makeCurrentWord = ({
  playedWords,
  isLastTurn,
}: {
  playedWords: string[][];
  isLastTurn: boolean;
}) => {
  // initialize currentWord from storedWords
  const firstLetter = determineFirstLetter(playedWords);
  const lastLetter = isLastTurn ? playedWords[0][4] : '';
  return [firstLetter, '', '', '', lastLetter];
};
