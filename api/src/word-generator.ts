// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomWords = require('better-random-words');

// generates a random five letter word when called
export const wordGenerator = () => {
  let generatedWords = [];
  let chosenWord = undefined;
  while (!chosenWord) {
    for (const word of generatedWords) {
      if (word.length === 5) {
        chosenWord = word;
      }
    }
    generatedWords = randomWords({ min: 5, max: 5 });
  }
  return chosenWord.split('');
};
