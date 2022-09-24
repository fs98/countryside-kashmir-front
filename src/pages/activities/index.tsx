import { Block } from '@/components/Block/Block';
import { CardSimple } from '@/components/CardSimple/CardSimple';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { ItemsProps } from '@/pages';
import { Grid, Link } from '@mui/material';
import { FC } from 'react';

export const Activities: FC<{ activities: ItemsProps[] }> = ({ activities }) => (
  <ImageHeaderLayout title="Activities - Countryside Kashmir" heading="Activities">
    <Block title="Activities">
      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {activities.map((activity, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <Link
              href={`/activities/${activity.slug}`}
              sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              <CardSimple item={activity} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const activities = await axios
    .get('/api/guest/activities')
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      activities,
    },
  };
};

export default Activities;
