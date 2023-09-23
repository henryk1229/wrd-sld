import Tile from './tile';

interface Props {
  playedWords: string[][];
}

const makeWordMatrix = (playedWords: string[][]) => {
  const [firstWord, secondWord, thirdWord, fourthWord] = playedWords;

  const upperBound = secondWord
    ? secondWord
    : Array.from(firstWord, (v, i) => (i === 0 ? v : ''));

  const lowerBound = fourthWord
    ? fourthWord
    : Array.from(firstWord, (v, i) => {
        if (i === 0 && firstWord[firstWord.length - 1]) {
          return firstWord[firstWord.length - 1];
        }
        if (
          i === firstWord.length - 1 &&
          thirdWord &&
          thirdWord[firstWord.length - 1]
        ) {
          return thirdWord[firstWord.length - 1];
        }
        return '';
      });

  const innerArrays = [];

  for (let i = 1; i < upperBound.length - 1; i++) {
    const array = [];
    for (let innerI = 0; innerI < upperBound.length; innerI++) {
      if (innerI === 0) {
        const letter = playedWords[innerI][i];
        array.push(letter);
      } else if (innerI === upperBound.length - 1) {
        const letter = playedWords[2] ? playedWords[2][i] : '';
        array.push(letter);
      } else {
        array.push('');
      }
    }
    innerArrays.push(array);
  }

  return [upperBound, ...innerArrays, lowerBound];
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
