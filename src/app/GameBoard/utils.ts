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
  // allow submit if: current word has no blank tiles, letters are unused + no letters are repeated
  const shouldAllowSubmit = isLastTurn
    ? blankTileIdx === -1 &&
      !nonUniqueLetters &&
      !currentWordRepeatsLetters &&
      playedWords[0][0] === currentWord[4]
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
  const letter = lastSubmittedWord[lastSubmittedWord.length - 1];
  return letter;
};

export const makeCurrentWord = ({
  playedWords,
}: {
  playedWords: string[][];
}): string[] => {
  if (playedWords.length === 4) {
    return playedWords[0];
  }
  // initialize currentWord from storedWords
  const firstLetter = determineFirstLetter(playedWords);
  const lastLetter = playedWords.length === 3 ? playedWords[0][0] : '';
  return [firstLetter, '', '', '', lastLetter];
};
