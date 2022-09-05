import { Menu } from '@headlessui/react';
import { AppBar, Container, Grid, Link, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import ResponsiveAppBar from './MainNavbar';

export type LayoutProps = PropsWithChildren & {
  title: string;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <div> +91-9596404872 / 75</div>
              <a className="ml-5" href="mailto: countrysidekashmir@gmail.com">
                {' '}
                countrysidekashmir@gmail.com
              </a>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: { md: 'auto' } }}>
              <Link href="https://www.tripadvisor.in/Attraction_Review-g297623-d15557712-Reviews-Countryside_Kashmir_Tour_Travel-Srinagar_Srinagar_District_Kashmir_Jammu_and_Kas.html">
                <img width={30} src="https://countrysidekashmir.com/img/tripadvisor.png" alt="" />
              </Link>
              <Link sx={{ ml: 1 }} href="https://www.fLinkcebook.com/countrysidekashmir">
                <img width={30} src="https://countrysidekashmir.com/img/facebook.png" alt="" />
              </Link>
              <Link sx={{ ml: 1 }} href="https://www.instagram.com/countrysidekashmir/">
                <img width={30} src="https://countrysidekashmir.com/img/instagram.png" alt="" />
              </Link>
              <Link
                sx={{ ml: 1 }}
                href="https://www.google.com/maps/place/Countryside+Kashmir+Tour+%26+Travel/@34.0690528,74.4500511,15z/data=!4m5!3m4!1s0x0:0x8ce50dbaaad9ca86!8m2!3d34.0690528!4d74.4500511?shorturl=1">
                <img width={30} src="https://countrysidekashmir.com/img/google_map.png" alt="" />
              </Link>
              <Link sx={{ ml: 1 }} href="https://www.youtube.com/channel/UCxe23fscAkpQ2TOsnnKtkpQ">
                <img width={30} src="https://countrysidekashmir.com/img/youtube.png" alt="" />
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ResponsiveAppBar />

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <footer>
        <Container
          maxWidth="xl"
          sx={{ bgcolor: 'primary.main', color: 'white', py: 2, textAlign: 'center' }}>
          <div>All rights reserved &copy; Countryside Kashmir Tour and Travel</div>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
