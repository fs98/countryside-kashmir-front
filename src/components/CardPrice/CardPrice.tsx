import { FC } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { OfferProps } from '@/pages';

type CardPriceProps = {
  offer: OfferProps;
};

export const CardPrice: FC<CardPriceProps> = ({ offer }) => (
  <Card
    sx={{
      maxWidth: 345,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
    <CardMedia
      component="img"
      height="140"
      image="https://picsum.photos/id/1018/200/200"
      alt={offer.image_alt}
    />

    <Typography
      position="absolute"
      marginTop={2}
      marginLeft={-1}
      paddingX={2}
      paddingY={1}
      color="common.white"
      bgcolor="warning.main">
      {offer.price} ₹
    </Typography>

    <div>
      <CardContent>
        <Typography
          gutterBottom
          color="warning.main"
          variant="h5"
          component="div"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center">
          {offer.name}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center">
          Srinagar
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center">
          {offer.days} days {offer.nights} nights
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="warning">
          Learn More
        </Button>
      </CardActions>
    </div>
  </Card>
);
