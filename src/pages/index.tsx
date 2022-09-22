// import { useAuth } from '@/hooks/auth';
import { axios } from '@/lib/axios';
import { HomeLayout } from '@/layouts/HomeLayout';
import { AboutSection } from '@/blocks/HomePageBlocks/AboutSection';
import { BlogsPreview } from '@/blocks/HomePageBlocks/BlogsPreview';
import { Block } from '@/components/Block/Block';
import { CardPrice } from '@/components/CardPrice/CardPrice';
import { Grid } from '@mui/material';
import { CardSimple } from '@/components/CardSimple/CardSimple';

export type ImageProps = {
  image_url: string;
  image_alt: string;
};

export type SlidesProps = ImageProps & {
  title: string;
  subtitle: string;
};

export type ItemsProps = ImageProps & {
  title?: string;
  name?: string;
  slug: string;
};

export type ContentProps = {
  content: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: {
        text: string;
      };
    }>;
    version: string;
  };
};

export type BlogsProps = ImageProps &
  ContentProps & {
    title: string;
    slug: string;
  };

export type OfferProps = ItemsProps & {
  days: number;
  nights: number;
  persons: number;
  price: number;
  destinations: Array<{
    name: string;
  }>;
};

export type CategoryProps = {
  name: string;
  slug: string;
  packages: OfferProps[];
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
  // const { user } = useAuth({ middleware: 'guest' });

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
  const slides = await axios
    .get('/api/guest/slides')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const destinations = await axios
    .get('/api/guest/destinations')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const activities = await axios
    .get('/api/guest/activities')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const blogs = await axios
    .get('/api/guest/blogs')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  const categoryOffers = await axios
    .get('api/guest/categories')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      slides,
      destinations,
      activities,
      blogs,
      categoryOffers,
    }, // will be passed to the page component as props
  };
};

export default Home;
