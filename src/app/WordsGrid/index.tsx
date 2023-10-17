import { styled } from '@stitches/react';
import WordMatrix from './WordMatrix';
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
  return wordsGrid;
};

// TODO - rename component
const WordsGrid: React.FC<Props> = ({ playedWords }) => {
  const wordsGrid = makeWordsGrid(playedWords);

  // TODO - styling for grid? make it more intuitive?
  return (
    <WordsGridContainer>
      {wordsGrid.map((word: string[], wordIdx: number) => {
        const isBorderTile = !!word[0] && !wordsGrid[wordIdx + 1][0];
        return (
          <div style={{ display: 'flex' }} key={wordIdx}>
            {word.map((letter, letterIdx) => {
              // first and last letters in array will be right and left bounds of board
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
    </WordsGridContainer>
  );
};

export default WordsGrid;
