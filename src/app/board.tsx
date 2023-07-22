import { useCallback, useState } from 'react';
import CurrentWord from './current-word';
import SpringBoard from './spring-board';
import { useRotateBoard } from 'src/hooks/useRotateBoard';

const spellCheckWord = async (currentWord: string[]) => {
  // TODO - hook up dictionary
  if (currentWord.length === 0 || currentWord.includes('h')) {
    return false;
  }
  return true;
};

const Board: React.FC = () => {
  // keep board orientation in sync with submitted words
  const storedWords = localStorage.getItem('submittedWords') ?? '[]';
  const submittedWords: string[][] = JSON.parse(storedWords);

  // TODO - fix this
  // currentWord should start with first letter of last submittedWord
  const lastSubmittedWord = submittedWords[submittedWords.length - 1];
  const lastLetter = lastSubmittedWord[0];
  const [currentWord, setCurrentWord] = useState<string[]>([lastLetter]);

  const { springs, rotateBoard } = useRotateBoard(submittedWords.length);

  console.log('currentWord', currentWord);

  const handleSubmitWord = useCallback(async () => {
    // TODO - spellcheck
    const isValidWord = await spellCheckWord(currentWord);
    if (isValidWord) {
      const stringified = JSON.stringify([...submittedWords, currentWord]);
      localStorage.setItem('submittedWords', stringified);
      rotateBoard(submittedWords.length + 1);
      // next word should start with first letter of newly-submitted current word
      const newAnchorTile = currentWord[0];
      return setCurrentWord([newAnchorTile]);
    }
    // TODO - handle invalid word feedback
    return setCurrentWord([]);
  }, [currentWord, submittedWords, rotateBoard]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        // anchor tile cannot be deleted
        const newWord =
          currentWord.length > 1
            ? currentWord.slice(0, currentWord.length - 1)
            : currentWord;
        return setCurrentWord(newWord);
      }
      if (input === 'Enter') {
        return handleSubmitWord();
      }
    },
    [currentWord, handleSubmitWord]
  );

  // handle keyboard input, branch between whitespace and letter input
  const handleKeyboardInput = useCallback(
    (keyValue: string, keyCode: string) => {
      const isLetterInput = keyCode.includes('Key');
      // handle 'enter', 'delete', etc.
      if (!isLetterInput) {
        return handleWhiteSpaceInput(keyValue);
      }
      // add the letter to the array
      return setCurrentWord((currentWord) => currentWord.concat(keyValue));
    },
    [handleWhiteSpaceInput]
  );

  // TODO - "anchor tile"
  // first letter of submitted word is included in currentWord component by default
  // will make it easier to handle shake animation for invalid word feedback

  return (
    <>
      <div autoFocus={true} className="boardWrapper">
        <SpringBoard submittedWords={submittedWords} springs={springs} />
      </div>
      <CurrentWord
        currentWord={currentWord}
        handleKeyboardInput={handleKeyboardInput}
      />
    </>
  );
};

export default Board;
