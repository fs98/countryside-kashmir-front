import { axios } from '@/lib/axios';

const Packages = () => {
  return <div>Packages</div>;
};

export const getServerSideProps = async () => {
  const categoryOffers = await axios
    .get('api/guest/categories')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      categoryOffers,
    }, // will be passed to the page component as props
  };
};

export default Packages;
