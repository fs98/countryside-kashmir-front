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

export type CardStackSectionProps = {
  title: string;
  subtitle: string;
  items: {
    name: string;
    slug: string;
    image_url: string;
    image_alt: string;
  }[];
};

const CardStackSection: FC<CardStackSectionProps> = ({ title, subtitle, items }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ color: 'orange', fontWeight: '600', textTransform: 'uppercase' }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ color: 'black', fontWeight: '600', fontStyle: 'italic' }}>
        {subtitle}
      </Typography>

      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {items.map(item => {
          return (
            <Grid item xs={6} md={4} lg={3}>
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
                    {item.name}
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

export default CardStackSection;
