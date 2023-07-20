import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface TileProps {
  letter: string;
}

const Tile = (props: TileProps) => {
  return (
    <Box sx={{ height: 72, width: 64, margin: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" component="div" fontWeight="bold">
            {props.letter.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Tile;
