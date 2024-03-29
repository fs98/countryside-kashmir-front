import React from 'react';

import { Box } from '@mui/material';

import Blocks from 'editorjs-blocks-react-renderer';

import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { ItemsProps } from '@/pages/index';
import { Content, Image } from '@/types/global';

type DestinationProps = {
  destination: ItemsProps & {
    description: Content;
    keywords: string;
    destination_images: Image[];
  };
};

const Destination = ({ destination }: DestinationProps) => (
  <ImageHeaderLayout title={destination.name} heading="Blog">
    <Block title={destination.name} subtitle="subtitle">
      <Box marginTop={4}>
        <Blocks
          data={destination.description}
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
  const destination = await axios
    .get(`/api/guest/destinations/${slug}`)
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!destination) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination,
    },
  };
};

export default Destination;
