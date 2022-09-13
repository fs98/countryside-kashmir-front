import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import MainNavbar from './MainNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Typography } from '@mui/material';

export type LayoutProps = PropsWithChildren & {
  slides: {
    image_url: string;
    image_alt: string;
    title: string;
    subtitle: string;
    order: number;
  }[];
  title: string;
};

const Layout: FC<LayoutProps> = ({ slides, title, children }) => {
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
        speed={2000}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        className="absolute top-0 -z-1 -z-10 h-screen">
        {slides.map((slide, i) => {
          return (
            <SwiperSlide
              key={i}
              className={`bg-black bg-opacity-60 bg-blend-overlay bg-cover bg-no-repeat bg-[url('https://picsum.photos/500/300.jpg?random=1')] flex flex-col justify-center items-center`}>
              <Typography
                variant="h1"
                sx={{
                  textTransform: 'uppercase',
                  width: '75%',
                  textAlign: 'center',
                  fontWeight: '400',
                  color: 'orange',
                  textShadow: '2px 2px 10px black',
                }}>
                {slide.title}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontStyle: 'italic',
                  width: '75%',
                  textAlign: 'center',
                  color: 'white',
                  textShadow: '2px 2px 10px black',
                }}>
                {slide.subtitle}
              </Typography>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
