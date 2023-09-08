import Tile from './tile';

interface SBProps {
  submittedWords: string[][];
}

const makeWordMatrix = (submittedWords: string[][]) => {
  const [firstWord, secondWord, thirdWord, fourthWord] = submittedWords;

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
        const letter = submittedWords[innerI][i];
        array.push(letter);
      } else if (innerI === upperBound.length - 1) {
        const letter = submittedWords[2] ? submittedWords[2][i] : '';
        array.push(letter);
      } else {
        array.push('');
      }
    }
    innerArrays.push(array);
  }

  return [upperBound, ...innerArrays, lowerBound];
};

// This component rotates board when a word is submitted
const WordMatrix: React.FC<SBProps> = ({ submittedWords }) => {
  const wordMatrix = makeWordMatrix(submittedWords);

  return (
    <>
      {wordMatrix.map((array: string[], wordIdx: number) => {
        const isUpperOrLowerBound = [0, 4].includes(wordIdx);
        return (
          <div style={{ display: 'flex' }} key={wordIdx}>
            {array.map((letter, idx) => {
              const isBorderTile = isUpperOrLowerBound || [0, 4].includes(idx);
              return (
                <Tile
                  key={idx}
                  letter={letter}
                  isBorderTile={isBorderTile}
                  isAnchorTile={idx === 0}
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
