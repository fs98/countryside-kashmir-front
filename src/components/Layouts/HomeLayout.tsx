import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import MainNavbar from './MainNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export type LayoutProps = PropsWithChildren & {
  title: string;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <MainNavbar />

      <Swiper
        modules={[Navigation]}
        autoplay={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}>
        <SwiperSlide>
          <img width="100%" src="https://picsum.photos/500/300.jpg?random=1" alt="" />
          {/* <Image height="100%" width="100%" src={'https://picsum.photos/200/300.jpg'}></Image> */}
        </SwiperSlide>
        <SwiperSlide>
          <img width="100%" src="https://picsum.photos/500/300.jpg?random=2" alt="" />
          {/* <Image height="100%" width="100%" src={'https://picsum.photos/200/300.jpg'}></Image> */}
        </SwiperSlide>
        <SwiperSlide>
          <img width="100%" src="https://picsum.photos/500/300.jpg?random=3" alt="" />
          {/* <Image height="100%" width="100%" src={'https://picsum.photos/200/300.jpg'}></Image> */}
        </SwiperSlide>
      </Swiper>

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
