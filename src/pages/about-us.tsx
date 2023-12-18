import React from 'react';

import { Typography } from '@mui/material';

import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';

const AboutUs = (): JSX.Element => {
  return (
    <ImageHeaderLayout title="About - Countryside Kashmir" heading="About us">
      <Block title="Countryside Kashmir" subtitle="Here's a little bit something about us">
        <Typography variant="body1" fontWeight="light" marginTop={2} textAlign="justify">
          Countryside Kashmir is registered with the Department of Tourism, Govt. of Jammu and
          Kashmir, under registration 172/ADTG. The company is based out of Chandilora Tangmarg,
          which is also known the Gateway of Gulmarg. The company is a freshly establishment one.
          With the endeavor of provides exceptional, respectful, trustworthy service to our clients.
          Honesty and integrity are the sole motives of our company to restore the eroding trust of
          clients.
        </Typography>
        <Typography variant="body1" fontWeight="light" marginTop={2} textAlign="justify">
          It is not just about booking a package but making sure that you enjoy your time and enjoy
          worth every penny. Our mantra is very simple, you get what you pay for, Honesty and
          integrity is and will always remain at the core of our business values. We offer all type
          of travel related services within Kashmir, look through our packages, and give us a try.
          We promise, this will be life time experience.
        </Typography>
        <Typography variant="body1" fontWeight="light" marginTop={2} textAlign="justify">
          Countryside Kashmir has a team of specialist who work with great passion, honesty and with
          a rigor of ensuring that our clients are satisfied to the core by ensuring that you just
          don’t travel but feel the beauty of Kashmir in true sense.
        </Typography>
      </Block>
    </ImageHeaderLayout>
  );
};

export default AboutUs;
