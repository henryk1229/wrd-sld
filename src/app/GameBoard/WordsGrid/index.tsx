import { styled } from '@stitches/react';
import Tile from './Tile';
import GuideLine from './GuideLine';
import {
  animated,
  useSpring,
  useSpringRef,
  useTrail,
  useChain,
  easings,
} from '@react-spring/web';
import { makeSolutionSets } from '../SolutionDisplay';

const WordsGridContainer = styled('div', {
  width: '324px',
  height: '324px',
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'flex-start',
});

const TileWrapper = styled('div', {
  display: 'flex',
  margin: '12px 0px 0px',
  // justifyContent: 'center',
});

const Badge = styled(animated.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  height: '24px',
  width: '24px',
  marginLeft: '8px',
  border: '1.5px solid black',
  borderRadius: '50%',
});

const BadgeContents = styled(animated.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontSize: '11px',
  color: 'black',
});

interface Props {
  playedWords: string[][];
  solutionSet: string;
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

const WordsGrid: React.FC<Props> = ({ playedWords, solutionSet }) => (
  <WordsGridContainer className="WGContainer">
    {makeWordsGrid(playedWords).map((word: string[], wordIdx: number) => {
      const solutionSets = makeSolutionSets(playedWords, solutionSet);
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
              <AnimatedWord
                word={word}
                isLastTurn={playedWords.length >= 3}
                solutionSet={solutionSets[wordIdx]}
              />
            ) : (
              word.map((letter, letterIdx) => (
                <Tile
                  key={letterIdx}
                  letter={letter}
                  isPendingWord={isPendingWord}
                  isAnchorTile={[0].includes(letterIdx)}
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
  solutionSet: Set<string>;
  isLastTurn: boolean;
}
// animated on mount
const AnimatedWord: React.FC<WordProps> = ({
  word,
  solutionSet,
  isLastTurn,
}) => {
  console.log({ solutionSet });
  const trailsRef = useSpringRef();
  const trails = useTrail(word.length, {
    ref: trailsRef,
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: 180,
    },
  });
  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1200,
      easing: easings.easeInBack,
    },
  });

  useChain([trailsRef, springRef]);
  return (
    <animated.div style={{ display: 'flex', alignItems: 'center' }}>
      {trails.map((trail, idx) => {
        // first and last letters in array will be right and left bounds of board
        const isAnchorTile = isLastTurn ? idx === 0 : [0, 4].includes(idx);
        return (
          <Tile
            key={idx}
            letter={word[idx]}
            isPendingWord={false}
            isAnchorTile={isAnchorTile}
            spring={trail}
          />
        );
      })}
      <Badge style={{ ...spring }}>
        <BadgeContents>{solutionSet.size ?? '!'}</BadgeContents>
      </Badge>
    </animated.div>
  );
};

export default WordsGrid;
