import Block from '@/components/Block/Block';
import ImageHeaderLayout from '@/layouts/ImageHeaderLayout';
import axios from '@/lib/axios';
import moment from 'moment';
import { redirect } from 'next/dist/server/api-utils';
import { FC } from 'react';
import { BlogsProps } from '..';

type BlogProps = {
  blog: BlogsProps & {
    keywords: string;
    published_at: string;
  };
};

const Blog: FC<BlogProps> = ({ blog }) => {
  const published_at = moment(blog.published_at).format('LL');

  return (
    <ImageHeaderLayout title={blog.title} heading="Blog">
      <Block title={blog.title} subtitle={published_at}></Block>
    </ImageHeaderLayout>
  );
};

export const getServerSideProps = async ({ params: { slug } }) => {
  const blog = await axios
    .get(`/api/guest/blogs/${slug}`)
    .then(res => {
      console.log(res.data.data);
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      blog,
    },
  };
};

export default Blog;
