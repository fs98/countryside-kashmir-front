import { Grid, Link } from '@mui/material';

import { Block } from '@/components/Block/Block';
import { CardPrice } from '@/components/CardPrice/CardPrice';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';

import { CategoryProps } from '..';

type PackagesProps = {
  categoryOffers: CategoryProps[];
};

const Packages = ({ categoryOffers }: PackagesProps): JSX.Element => (
  <ImageHeaderLayout title="Packages - Countryside Kashmir" heading="Packages">
    {/* Categories and their packages */}
    {categoryOffers
      .filter(({ packages }) => packages.length > 0)
      .map(({ packages, name }, i) => (
        <Block key={i} title={name} subtitle={`Find the best ${name} we have`}>
          <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
            {packages.map((offer, i) => (
              <Grid key={i} item xs={6} md={4} lg={3}>
                <Link
                  href={`/packages/${offer.slug}`}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                  <CardPrice offer={offer} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Block>
      ))}
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const categoryOffers = await axios
    .get('api/guest/categories')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      categoryOffers,
    }, // will be passed to the page component as props
  };
};

export default Packages;
