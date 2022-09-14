import Head from 'next/head';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import HomeLayout from '@/components/Layouts/HomeLayout';
import CardStackSection from '@/components/CardStackSection';
import AboutSection from '@/components/AboutSection';

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

export type ActivitiesProps = {
  name: string;
  slug: string;
  image_url: string;
  image_alt: string;
};

type HomeProps = {
  slides: SlidesProps[];
  destinations: DestinationsProps[];
  activities: ActivitiesProps[];
};

const Home = ({ slides, destinations, activities }: HomeProps): JSX.Element => {
  const { user } = useAuth({ middleware: 'guest' });
  console.log('activities', activities);

  return (
    <HomeLayout
      slides={slides}
      title="Countryside Kashmir Tour And Travel - Book Kashmir Tour Packages at Best Price's">
      <section className="bg-zinc-100">
        <AboutSection
          title="About - Countryside Kashmir"
          subtitle="Our mantra is very simple, you get what you pay for, Honesty and integrity is and will always remain at the core of our business values."
        />
      </section>

      <CardStackSection
        title="Popular Destinations"
        subtitle="There’s probably no other place on the planet that blazes its way into your memory like
        Kashmir."
        items={destinations}
      />

      <CardStackSection
        title="Things to do in Kashmir"
        subtitle="Mostly located in the Himalayan ranges, Kashmir offers a plethora of experiences that one must take by indulging in the below listed exciting things to do. The location and the terrain make some of the things are exclusive to this destination, so go ahead and enjoy all of these."
        items={activities}
      />
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

  const activitiesApi = await axios
    .get('/api/guest/activities')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const activities: ActivitiesProps[] = activitiesApi.data.map(
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
      activities,
    }, // will be passed to the page component as props
  };
};

export default Home;
