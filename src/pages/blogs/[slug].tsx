import { FC } from 'react';

import { Box } from '@mui/material';

import Blocks from 'editorjs-blocks-react-renderer';
import moment from 'moment';

import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';

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
      <Block title={blog.title} subtitle={published_at}>
        <Box marginTop={4}>
          <Blocks
            data={blog.content}
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
        </Box>
      </Block>
    </ImageHeaderLayout>
  );
};

export const getServerSideProps = async ({ params: { slug } }) => {
  const blog = await axios
    .get(`/api/guest/blogs/${slug}`)
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export default Blog;
