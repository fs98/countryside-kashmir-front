import React from 'react';

import Blocks from 'editorjs-blocks-react-renderer';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';

import { axios } from '@/lib/axios';
import { CardSimple } from '@/components/CardSimple/CardSimple';
import BookingForm from '@/blocks/PackagesPageBlocks/BookingForm';

const Package = ({ offer }): JSX.Element => (
  <ImageHeaderLayout title={offer.name} heading="Blog">
    <Block title={offer.name} subtitle="subtitle">
      <Grid marginTop={4} container rowSpacing={5} spacing={5}>
        {/* Left side - Content */}
        <Grid item xs={12} md={8}>
          <Blocks
            data={offer.description}
            config={{
              code: {
                className: 'language-js',
              },
              delimiter: {
                className: 'border border-2 w-16 mx-auto',
              },
              embed: {
                className: 'border-0',
              },
              header: {
                className: 'font-bold',
              },
              image: {
                className: 'w-full max-w-screen-md',
                actionsClassNames: {
                  stretched: 'w-full h-80 object-cover',
                  withBorder: 'border border-2',
                  withBackground: 'p-2',
                },
              },
              list: {
                className: 'list-inside',
                type: {
                  unordered: 'list-disc',
                },
              },
              paragraph: {
                className: 'text-base text-opacity-75 mb-5',
                actionsClassNames: {
                  alignment: 'text-{alignment}', // This is a substitution placeholder: left or center.
                },
              },
              quote: {
                className: 'py-3 px-5 italic font-serif',
              },
              table: {
                className: 'table-auto',
              },
            }}
          />
        </Grid>

        {/* Right side - Destinations */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            marginBottom={4}
            fontWeight="bold"
            color="warning.main"
            textTransform="uppercase">
            Destinations
          </Typography>

          {offer.destinations.length > 0 ? (
            offer.destinations.map((destination, i) => (
              <Box key={i} marginBottom={4}>
                <Link
                  href={`/destinations/${destination.slug}`}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <CardSimple item={destination} />
                </Link>
              </Box>
            ))
          ) : (
            <div>No destinations</div>
          )}
        </Grid>
      </Grid>
    </Block>
    <Block title="Book Now">
      <Container maxWidth="md">
        <BookingForm />
      </Container>
    </Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async ({ params: { slug } }) => {
  const offer = await axios
    .get(`/api/guest/packages/${slug}`)
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!offer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      offer,
    },
  };
};

export default Package;
