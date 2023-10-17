import Tile from './Tile';

interface Props {
  playedWords: string[][];
}

const makeLowerBound = (
  secondWord: string[],
  thirdWord: string[]
): string[] => {
  // there's a third word, reverse and return it
  if (thirdWord) {
    const reversed = thirdWord.slice().reverse();
    return reversed;
  }
  // initialize empty bound
  const lowerBound = ['', '', '', '', ''];
  // if there's a second word, the last letter should be in the bound
  if (secondWord) {
    lowerBound[lowerBound.length - 1] = secondWord[secondWord.length - 1];
  }

  return lowerBound;
};

const makeWordMatrix = (playedWords: string[][]) => {
  const [firstWord, secondWord, thirdWord, fourthWord] = playedWords;

  const lowerBound = makeLowerBound(secondWord, thirdWord);

  const innerArrays = [];

  for (let i = 1; i < firstWord.length - 1; i++) {
    const array = [];
    for (let innerI = 0; innerI < firstWord.length; innerI++) {
      if (innerI === 0) {
        // TODO - check this branch
        const letter = fourthWord ? fourthWord[i] : '';
        array.push(letter);
      } else if (innerI === firstWord.length - 1) {
        const letter = playedWords[1] ? playedWords[1][i] : '';
        array.push(letter);
      } else {
        array.push('');
      }
    }
    innerArrays.push(array);
  }

  return [firstWord, ...innerArrays, lowerBound];
};

// This component translates the playedWords[][] prop into a square game board
const WordMatrix: React.FC<Props> = ({ playedWords }) => {
  const wordMatrix = makeWordMatrix(playedWords);

  return (
    <>
      {wordMatrix.map((array: string[], wordIdx: number) => {
        // first and last words in array will be upper and lower bounds of board
        const isUpperOrLowerBound = [0, 4].includes(wordIdx);
        return (
          <div style={{ display: 'flex' }} key={wordIdx}>
            {array.map((letter, idx) => {
              // first and last letters in array will be right and left bounds of board
              const isBorderTile = isUpperOrLowerBound || [0, 4].includes(idx);
              const isAnchorTile = isUpperOrLowerBound && [0, 4].includes(idx);
              return (
                <Tile
                  key={idx}
                  letter={letter}
                  isBorderTile={isBorderTile}
                  isAnchorTile={isAnchorTile}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default WordMatrix;
