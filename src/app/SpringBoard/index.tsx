import { styled } from '@stitches/react';
import WordMatrix from './WordMatrix';
import Tile from './Tile';

const SpringBoardContainer = styled('div', {
  height: '360px',
  width: '360px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

interface Props {
  playedWords: string[][];
}

// TODO - do while loop?
const makeWordsGrid = (playedWords: string[][]): string[][] => {
  const wordsGrid = ['', '', '', ''];
  return wordsGrid.map((position, idx) => {
    if (playedWords[idx]) {
      return playedWords[idx];
    }
    const precedingWord = playedWords[idx - 1];
    const firstLetter = precedingWord
      ? precedingWord[precedingWord.length - 1]
      : '';
    // TODO - playedWords or idx here?
    const lastLetter = playedWords.length === 3 ? playedWords[0][0] : '';
    return [firstLetter, '', '', '', lastLetter];
  });
};

// This component rotates board when a word is submitted
const SpringBoard: React.FC<Props> = ({ playedWords }) => {
  const wordsGrid = makeWordsGrid(playedWords);

  return (
    <SpringBoardContainer>
      {wordsGrid.map((word: string[], wordIdx: number) => {
        return (
          <div style={{ display: 'flex' }} key={wordIdx}>
            {word.map((letter, letterIdx) => {
              // first and last letters in array will be right and left bounds of board
              const isBorderTile =
                [0, 4].includes(letterIdx) &&
                !word[1] &&
                !!playedWords[wordIdx - 1] &&
                !!letter;
              const isAnchorTile = [0, 4].includes(letterIdx);
              return (
                <Tile
                  key={letterIdx}
                  letter={letter}
                  isBorderTile={isBorderTile}
                  isAnchorTile={isAnchorTile}
                />
              );
            })}
          </div>
        );
      })}
    </SpringBoardContainer>
  );
};

export default SpringBoard;
