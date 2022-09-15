import { ImageProps, ItemsProps } from '@/pages';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { FC } from 'react';

type newCardStackProps = ImageProps & {
  name: string;
  slug: string;
};

type CardStackProps = {
  items: ItemsProps[];
};

const CardStack: FC<CardStackProps> = ({ items }) => (
  <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
    {items.map((item, i) => (
      <Grid key={i} item xs={6} md={4} lg={3}>
        <Card
          sx={{
            maxWidth: 345,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <CardMedia component="img" height="140" image={item.image_url} alt="green iguana" />
          <div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
                textTransform="uppercase">
                {item.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="warning">
                Learn More
              </Button>
            </CardActions>
          </div>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default CardStack;
