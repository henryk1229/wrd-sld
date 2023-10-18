import { styled } from '@stitches/react';
import Tile from './Tile';

const WordsGridContainer = styled('div', {
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

// TODO - investigate looping conventions for this edgecase
const makeWordsGrid = (playedWords: string[][]): string[][] => {
  const wordsGrid = playedWords.slice();
  let numToAdd = 4 - playedWords.length;
  const emptyGrid = ['', '', '', '', ''];
  do {
    numToAdd -= 1;
    wordsGrid.push(emptyGrid);
  } while (numToAdd > 0);

  const insertIdx = playedWords.length;
  const firstLetter = playedWords[playedWords.length - 1][4];
  const grid = [firstLetter, '', '', '', ''];
  if (insertIdx === 3) {
    const lastLetter = playedWords[0][0];
    grid[4] = lastLetter;
  }
  wordsGrid[insertIdx] = grid;
  return wordsGrid;
};

// TODO - rename component
const WordsGrid: React.FC<Props> = ({ playedWords }) => {
  const wordsGrid = makeWordsGrid(playedWords);
  return (
    <WordsGridContainer>
      {wordsGrid.map((word: string[], wordIdx: number) => {
        const isPendingWord = !!word[0] && !word[1];
        return (
          <div style={{ display: 'flex', margin: '8px' }} key={wordIdx}>
            {word.map((letter, letterIdx) => {
              // first and last letters in array will be right and left bounds of board
              const isAnchorTile = [0, 4].includes(letterIdx);
              return (
                <Tile
                  key={letterIdx}
                  letter={letter}
                  isPendingWord={isPendingWord}
                  isAnchorTile={isAnchorTile}
                />
              );
            })}
          </div>
        );
      })}
    </WordsGridContainer>
  );
};

export default WordsGrid;
