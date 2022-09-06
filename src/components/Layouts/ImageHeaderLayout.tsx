import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import MainNavbar from './MainNavbar';

export type LayoutProps = PropsWithChildren & {
  title: string;
  heading: string;
};

const ImageHeaderLayout: FC<LayoutProps> = ({ title, heading, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        height={300}
        className="bg-bottom bg-cover bg-no-repeat bg-[url('https://live.staticflickr.com/2207/2251104255_b00e017fb9_b.jpg')]">
        <MainNavbar color="transparent" />

        <Typography
          variant="h4"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            marginTop: 5,
            marginBottom: 2,
          }}>
          {heading}
        </Typography>
        <Divider
          sx={{
            backgroundColor: 'white',
            width: `${heading.trim().length * 10}px`, //So it gets width automatically based on length of heading
            height: '5px',
            m: 'auto',
          }}
        />
      </Box>

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default ImageHeaderLayout;
