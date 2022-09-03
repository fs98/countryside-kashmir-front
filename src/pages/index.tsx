import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';

type SlidesProps = {
  image_url: string;
  image_alt: string;
  title: string;
  subtitle: string;
  order: number;
};

type HomeProps = {
  slides: SlidesProps[];
};

const Home = ({ slides }: HomeProps): JSX.Element => {
  const { user } = useAuth({ middleware: 'guest' });

  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>

      <div>
        {slides.map((slide, i) => {
          return <li key={i}>{slide.title}</li>;
        })}
      </div>
    </>
  );
};

export const getServerSideProps = async context => {
  const slidesApi = await axios
    .get('/api/guest/slides')
    .then(res => {
      return res.data;
    })
    // .then(response => ({
    //   ...response,
    //   data: response.data.map(({ image_url, image_alt, title, subtitle, order }) => ({
    //     image_url,
    //     image_alt,
    //     title,
    //     subtitle,
    //     order,
    //   })),
    // }))
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const slides: SlidesProps[] = slidesApi.data.map(
    ({ image_url, image_alt, title, subtitle, order }) => ({
      image_url,
      image_alt,
      title,
      subtitle,
      order,
    }),
  );

  return {
    props: {
      slides,
    }, // will be passed to the page component as props
  };
};

export default Home;
