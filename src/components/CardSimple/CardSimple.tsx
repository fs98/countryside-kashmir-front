import { FC } from 'react';

import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { ItemsProps } from '@/pages';

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
    </>
  </Card>
);
