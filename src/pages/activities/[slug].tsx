import React from 'react';

import { Box } from '@mui/material';

import Blocks from 'editorjs-blocks-react-renderer';

import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { Content, Image } from '@/types/global';

import { ItemsProps } from '..';

type ActivityProps = {
  activity: ItemsProps & {
    description: Content;
    keywords: string;
    activity_images: Image[];
  };
};

const Activity = ({ activity }: ActivityProps) => (
  <ImageHeaderLayout title={activity.name} heading="Blog">
    <Block title={activity.name} subtitle="subtitle">
      <Box marginTop={4}>
        <Blocks
          data={activity.description}
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

export const getServerSideProps = async ({ params: { slug } }) => {
  const activity = await axios
    .get(`/api/guest/activities/${slug}`)
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!activity) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
    },
  };
};

export default Activity;
