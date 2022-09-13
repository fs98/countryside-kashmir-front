import { DestinationsProps } from '@/pages';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';

export const Destinations: FC<{ destinations: DestinationsProps[] }> = ({ destinations }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 6, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ color: 'orange', fontWeight: '600', textTransform: 'uppercase' }}>
        Popular Destinations
      </Typography>
      <Typography variant="h6" sx={{ color: 'black', fontWeight: '600', fontStyle: 'italic' }}>
        There’s probably no other place on the planet that blazes its way into your memory like
        Kashmir.
      </Typography>

      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {destinations.map(destination => {
          return (
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/500/300.jpg?random=1"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                    {destination.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: 'orange' }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};