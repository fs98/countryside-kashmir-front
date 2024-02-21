import { PropsWithChildren } from 'react';

import { Typography } from '@mui/material';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Footer } from '@/layouts/Footer';
import { MainNavbar } from '@/layouts/MainNavbar';
import type { SlidesProps } from '@/pages';

export type HomeLayoutProps = PropsWithChildren & {
  slides: SlidesProps[];
  title: string;
};

export const HomeLayout = ({ slides, title, children }: HomeLayoutProps) => {
  SwiperCore.use([Autoplay]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <MainNavbar color="transparent" sx={{ zIndex: '1' }} />

      <Swiper
        modules={[Navigation]}
        autoplay={{ delay: 3000 }}
        loop={true}
        speed={2000}
        spaceBetween={50}
        slidesPerView={1}
        className="absolute top-0 -z-1 -z-10 h-screen">
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            style={{
              backgroundImage: `url(${slide.image_url})`,
            }}
            className={`bg-black bg-opacity-60 bg-blend-overlay bg-cover bg-no-repeat flex flex-col justify-center items-center`}>
            <Typography
              variant="h1"
              color="warning.main"
              fontWeight={400}
              textAlign="center"
              textTransform="uppercase"
              width="75%"
              sx={{
                textShadow: '2px 2px 10px black',
              }}>
              {slide.title}
            </Typography>
            <Typography
              variant="h3"
              fontStyle="italic"
              width="75%"
              textAlign="center"
              color="common.white"
              sx={{
                textShadow: '2px 2px 10px black',
              }}>
              {slide.subtitle}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <Footer />
    </>
  );
};
