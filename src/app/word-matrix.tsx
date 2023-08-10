import Word from './word';
import { Spring } from '../hooks/useRotateBoard';

interface SBProps {
  submittedWords: string[][];
  spring: Spring;
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
const WordMatrix: React.FC<SBProps> = (props) => {
  const { submittedWords } = props;

  const wordMatrix = makeWordMatrix(submittedWords);

  return (
    <>
      {wordMatrix.map((array: string[], idx: number) => (
        <div style={{ display: 'flex' }} key={idx}>
          <Word letters={array} isCurrentWord={false} />
        </div>
      ))}
    </>
  );
};

export default WordMatrix;
