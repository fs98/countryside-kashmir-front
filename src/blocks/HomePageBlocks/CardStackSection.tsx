import { FC } from 'react';
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
import { SectionProps } from '@/pages';

export type CardStackSectionProps = {
  title: string;
  subtitle: string;
  items: SectionProps[];
};

const CardStackSection: FC<CardStackSectionProps> = ({ title, subtitle, items }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        color="warning.main"
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase">
        {title}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        fontWeight="light"
        marginTop={2}
        textAlign="center">
        {subtitle}
      </Typography>

      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {items.map(item => (
          <Grid item xs={6} md={4} lg={3}>
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
    </Container>
  );
};

export default CardStackSection;
