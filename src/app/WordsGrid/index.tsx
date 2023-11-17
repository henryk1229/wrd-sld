import { styled } from '@stitches/react';
import Tile from './Tile';
import GuideLine from './GuideLine';
import { useTrail } from '@react-spring/web';

const WordsGridContainer = styled('div', {
  height: '360px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '32px',
});

const TileWrapper = styled('div', {
  display: 'flex',
  margin: '12px 0px 0px',
  justifyContent: 'center',
});

interface Props {
  playedWords: string[][];
}

const makeWordsGrid = (playedWords: string[][]): string[][] => {
  const emptyGrid = ['', '', '', '', ''];
  // we haven't fetched the initial word yet, return a skeleton grid
  if (playedWords[0] && playedWords[0].length === 0) {
    return [emptyGrid, emptyGrid, emptyGrid, emptyGrid];
  }
  // the game is over, don't insert pending and empty words
  if (playedWords.length > 3) {
    return playedWords;
  }
  // prevent mutation of original array
  const wordsGrid = playedWords.slice();
  // add empty words to make grid length 4
  let numToAdd = 4 - playedWords.length;
  do {
    numToAdd -= 1;
    wordsGrid.push(emptyGrid);
  } while (numToAdd > 0);
  // creating pending word with letters from last played word
  const insertIdx = playedWords.length;
  const firstLetter = playedWords[playedWords.length - 1][4];
  const grid = [firstLetter, '', '', '', ''];
  wordsGrid[insertIdx] = grid;
  return wordsGrid;
};

const WordsGrid: React.FC<Props> = ({ playedWords }) => (
  <WordsGridContainer>
    {makeWordsGrid(playedWords).map((word: string[], wordIdx: number) => {
      const isPendingWord = !!word[0] && !word[1];
      const isLastPlayedWord = wordIdx === playedWords.length - 1;
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          key={wordIdx}
        >
          <TileWrapper>
            {isLastPlayedWord ? (
              <AnimatedWord word={word} />
            ) : (
              word.map((letter, letterIdx) => (
                <Tile
                  key={letterIdx}
                  letter={letter}
                  isPendingWord={isPendingWord}
                  isAnchorTile={[0, 4].includes(letterIdx)}
                />
              ))
            )}
          </TileWrapper>
          {wordIdx !== 3 && <GuideLine />}
        </div>
      );
    })}
  </WordsGridContainer>
);

interface WordProps {
  word: string[];
}
// animated on mount
const AnimatedWord: React.FC<WordProps> = ({ word }) => {
  const trails = useTrail(word.length, {
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: 180,
    },
  });
  return trails.map((trail, idx) => {
    // first and last letters in array will be right and left bounds of board
    const isAnchorTile = [0, 4].includes(idx);
    return (
      <Tile
        key={idx}
        letter={word[idx]}
        isPendingWord={false}
        isAnchorTile={isAnchorTile}
        spring={trail}
      />
    );
  });
};

export default WordsGrid;
