// import { useAuth } from '@/hooks/auth';
import { Grid } from '@mui/material';

import { AboutSection } from '@/blocks/HomePageBlocks/AboutSection';
import { BlogsPreview } from '@/blocks/HomePageBlocks/BlogsPreview';
import { Block } from '@/components/Block/Block';
import { CardPrice } from '@/components/CardPrice/CardPrice';
import { CardSimple } from '@/components/CardSimple/CardSimple';
import { useAuth } from '@/hooks/auth';
import { HomeLayout } from '@/layouts/HomeLayout';
import { axios } from '@/lib/axios';
import { Content, Image } from '@/types/global';
import { Package } from '@/types/resources';

export type SlidesProps = Image & {
  title: string;
  subtitle: string;
};

// ItemsProps correspond to destinations, activities and packages
export type ItemsProps = Image & {
  title?: string;
  name?: string;
  slug: string;
};

export type BlogsProps = Image & {
  content: Content;
  title: string;
  slug: string;
};

export type CategoryProps = {
  name: string;
  slug: string;
  packages: Package[];
};

type HomeProps = {
  slides: SlidesProps[];
  destinations: ItemsProps[];
  activities: ItemsProps[];
  blogs: BlogsProps[];
  categoryOffers: CategoryProps[];
};

const Home = ({
  slides,
  destinations,
  activities,
  blogs,
  categoryOffers,
}: HomeProps): JSX.Element => {
  const { user } = useAuth({ middleware: 'guest' });
  console.log(user);

  return (
    <HomeLayout
      slides={slides}
      title="Countryside Kashmir Tour And Travel - Book Kashmir Tour Packages at Best Price's">
      {/* About Us Block */}
      <section className="bg-zinc-100">
        <AboutSection
          title="About - Countryside Kashmir"
          subtitle="Our mantra is very simple, you get what you pay for, Honesty and integrity is and will always remain at the core of our business values."
        />
      </section>

      {/* Destinations Block */}
      <Block
        title="Popular Destinations"
        subtitle="There’s probably no other place on the planet that blazes its way into your memory like
        Kashmir.">
        <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
          {destinations.map((destination, i) => (
            <Grid key={i} item xs={6} md={4} lg={3}>
              <CardSimple item={destination} />
            </Grid>
          ))}
        </Grid>
      </Block>

      {/* Categories and their packages */}
      {categoryOffers
        .filter(({ packages }) => packages.length > 0)
        .map(({ packages, name }, i) => (
          <Block key={i} title={name} subtitle={`Find the best ${name} we have`}>
            <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
              {packages.map((offer, i) => (
                <Grid key={i} item xs={6} md={4} lg={3}>
                  <CardPrice offer={offer} />
                </Grid>
              ))}
            </Grid>
          </Block>
        ))}

      {/* Blogs Block */}
      <section className="bg-zinc-100">
        {blogs.length > 0 ? <BlogsPreview blogs={blogs} /> : 'No blogs'}
      </section>

      {/* Activities Block */}
      <Block
        title="Things to do in Kashmir"
        subtitle="Mostly located in the Himalayan ranges, Kashmir offers a plethora of experiences that one must take by indulging in the below listed exciting things to do. The location and the terrain make some of the things are exclusive to this destination, so go ahead and enjoy all of these.">
        <Grid marginTop={6} container rowSpacing={5} spacing={5} justifyContent="center">
          {activities.map((activity, i) => (
            <Grid key={i} item xs={6} md={4} lg={3}>
              <CardSimple item={activity} />
            </Grid>
          ))}
        </Grid>
      </Block>
    </HomeLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const apiEndpoints = [
      '/api/guest/slides',
      '/api/guest/destinations',
      '/api/guest/activities',
      '/api/guest/blogs',
      'api/guest/categories',
    ];

    const allResponses = await Promise.all(
      apiEndpoints.map(endpoint =>
        axios
          .get(endpoint)
          .then(res => res.data.data || [])
          .catch(() => {
            return [];
          }),
      ),
    );

    const [slides, destinations, activities, blogs, categoryOffers] = allResponses;

    return {
      props: {
        slides,
        destinations,
        activities,
        blogs,
        categoryOffers,
      },
    };
  } catch (error) {
    if (error.response?.status !== 409) throw error;
    console.error('API request failed:', error);

    // Return default values in case of failure
    return {
      props: {
        slides: [],
        destinations: [],
        activities: [],
        blogs: [],
        categoryOffers: [],
      },
    };
  }
};

export default Home;
