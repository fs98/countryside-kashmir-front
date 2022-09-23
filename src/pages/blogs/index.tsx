import { Block } from '@/components/Block/Block';
import { CardSimple } from '@/components/CardSimple/CardSimple';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { BlogsProps } from '@/pages';
import { Grid, Link } from '@mui/material';
import { FC } from 'react';

export const Blogs: FC<{ blogs: BlogsProps[] }> = ({ blogs }) => (
  <ImageHeaderLayout title="Blogs - Countryside Kashmir" heading="Blogs">
    <Block title="Blogs">
      <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
        {blogs.map((blog, i) => (
          <Grid key={i} item xs={6} md={4} lg={3}>
            <Link href={`/blogs/${blog.slug}`} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              <CardSimple item={blog} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const blogs = await axios
    .get('/api/guest/blogs')
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      blogs,
    },
  };
};

export default Blogs;
