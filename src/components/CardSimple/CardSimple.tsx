import { ItemsProps } from '@/pages';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';

type CardSimpleProps = {
  item: ItemsProps;
};

export const CardSimple: FC<CardSimpleProps> = ({
  item: { image_url, image_alt, name, title },
}) => (
  <Card
    sx={{
      maxWidth: 345,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
    <CardMedia component="img" height="140" image={image_url} alt={image_alt} />
    <>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontWeight="bold"
          textTransform="uppercase">
          {name}
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="warning">
          Learn More
        </Button>
      </CardActions>
    </>
  </Card>
);
