import { Button, Container, Grid, Typography } from '@mui/material';
import { FC } from 'react';

export type AboutSectionProps = {
  title: string;
  subtitle: string;
};

const AboutSection: FC<AboutSectionProps> = ({ title, subtitle }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ color: 'orange', fontWeight: '600', textTransform: 'uppercase' }}>
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: 'black', fontWeight: '600', fontStyle: 'italic', marginTop: 2 }}>
        {subtitle}
      </Typography>

      <Grid marginTop={6} container rowSpacing={5} spacing={5}>
        <Grid item xs={12} md={6} container>
          <img
            src="https://countrysidekashmir.com/img/countryside_kashmir_man_backpack.jpg"
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={6} container>
          <Typography variant="h6" sx={{ fontWeight: '600', textTransform: 'uppercase' }}>
            Countryside Kashmir Tour & Travel
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', marginTop: 2 }}>
            Countryside Kashmir is registered with the Department of Tourism, Govt. of Jammu and
            Kashmir, under registration 172/ADTG. The company is based out of Chandilora Tangmarg,
            which is also known the Gateway of Gulmarg. The company is a freshly establishment one.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'justify', marginTop: 2 }}>
            With the endeavor of provides exceptional, respectful, trustworthy service to our
            clients. Honesty and integrity are the sole motives of our company to restore the
            eroding trust of clients. It is not just about booking a package but making sure that
            you enjoy your time and enjoy worth every penny.
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: 'orange !important', marginTop: 2, py: 0 }}>
            Read more...
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;
