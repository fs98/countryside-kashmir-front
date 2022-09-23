import { axios } from '@/lib/axios';

const Destination = () => <div>Destination</div>;

export const getServerSideProps = async ({ params: { slug } }) => {
  const destination = await axios
    .get(`/api/guest/destinations/${slug}`)
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!destination) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination,
    },
  };
};

export default Destination;
