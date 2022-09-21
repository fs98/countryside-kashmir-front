import Block from '@/components/Block/Block';
import ImageHeaderLayout from '@/layouts/ImageHeaderLayout';
import axios from '@/lib/axios';
import { FC } from 'react';
import { BlogProps } from '.';

export const Blogs: FC<{ blogs: BlogProps[] }> = ({ blogs }) => (
  <ImageHeaderLayout title="Blogs - Countryside Kashmir" heading="Blogs">
    <Block title="Blogs"></Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const blogs = await axios
    .get('/api/guest/blogs')
    .then(res => {
      return res.data;
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
