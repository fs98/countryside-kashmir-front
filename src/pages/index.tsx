import Head from 'next/head';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import HomeLayout from '@/components/Layouts/HomeLayout';
import { Destinations } from '@/components/Destinations';

export type SlidesProps = {
  image_url: string;
  image_alt: string;
  title: string;
  subtitle: string;
  order: number;
};

export type DestinationsProps = {
  name: string;
  slug: string;
  image_url: string;
  image_alt: string;
};

type HomeProps = {
  slides: SlidesProps[];
  destinations: DestinationsProps[];
};

const Home = ({ slides, destinations }: HomeProps): JSX.Element => {
  const { user } = useAuth({ middleware: 'guest' });

  return (
    <HomeLayout
      slides={slides}
      title="Countryside Kashmir Tour And Travel - Book Kashmir Tour Packages at Best Price's">
      <Destinations destinations={destinations} />
    </HomeLayout>
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

  const destinationsApi = await axios
    .get('/api/guest/destinations')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const destinations: DestinationsProps[] = destinationsApi.data.map(
    ({ name, slug, image_url, image_alt }) => ({
      name,
      slug,
      image_url,
      image_alt,
    }),
  );

  return {
    props: {
      slides,
      destinations,
    }, // will be passed to the page component as props
  };
};

export default Home;
