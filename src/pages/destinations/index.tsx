import { Grid, Link } from '@mui/material';
import { ItemsProps } from '..';
import { Block } from '@/components/Block/Block';
import { CardSimple } from '@/components/CardSimple/CardSimple';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';

type DestinationsProps = {
  destinations: ItemsProps[];
};

const Destinations = ({ destinations }: DestinationsProps): JSX.Element => (
  <ImageHeaderLayout title="Destinations - Countryside Kashmir" heading="Destinations">
    <Block
      title="Places to go"
      subtitle="Check out our top destinations! Which one is going to be your choice?">
      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {destinations.map((destination, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <Link
              href={`/destinations/${destination.slug}`}
              sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              <CardSimple item={destination} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const destinations = await axios
    .get('/api/guest/destinations')
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      destinations,
    },
  };
};

export default Destinations;
