import Head from 'next/head';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import HomeLayout from '@/components/Layouts/HomeLayout';
import CardStackSection from '@/components/CardStackSection';
import AboutSection from '@/components/AboutSection';
import BlogsPreview from '@/components/BlogsPreview';

type ImageProps = {
  image_url: string;
  image_alt: string;
};

export type SlidesProps = ImageProps & {
  title: string;
  subtitle: string;
  order: number;
};

export type SectionProps = ImageProps & {
  name: string;
  slug: string;
};

export type BlogsProps = ImageProps & {
  title: string;
  slug: string;
  content: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: {
        text: string;
      };
    }>;
  };
};

type HomeProps = {
  slides: SlidesProps[];
  destinations: SectionProps[];
  activities: SectionProps[];
  blogs: BlogsProps[];
};

const Home = ({ slides, destinations, activities, blogs }: HomeProps): JSX.Element => {
  const { user } = useAuth({ middleware: 'guest' });

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

      <section className="bg-zinc-100">
        {blogs.length ? <BlogsPreview blogs={blogs} /> : 'No blogs'}
      </section>

      <CardStackSection
        title="Things to do in Kashmir"
        subtitle="Mostly located in the Himalayan ranges, Kashmir offers a plethora of experiences that one must take by indulging in the below listed exciting things to do. The location and the terrain make some of the things are exclusive to this destination, so go ahead and enjoy all of these."
        items={activities}
      />
    </HomeLayout>
  );
};

export const getServerSideProps = async () => {
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

  const destinations: SectionProps[] = destinationsApi.data.map(
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

  const activities: SectionProps[] = activitiesApi.data.map(
    ({ name, slug, image_url, image_alt }) => ({
      name,
      slug,
      image_url,
      image_alt,
    }),
  );

  const blogsApi = await axios
    .get('/api/guest/blogs')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const blogs = blogsApi.data.slice(0, 4).map(({ title, slug, image_url, image_alt, content }) => ({
    title,
    slug,
    image_url,
    image_alt,
    content,
  }));

  return {
    props: {
      slides,
      destinations,
      activities,
      blogs,
    }, // will be passed to the page component as props
  };
};

export default Home;
