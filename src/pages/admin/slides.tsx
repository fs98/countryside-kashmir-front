import { axios } from '@/lib/axios';

const Slides = ({ slides }) => {
  console.log(slides);

  return <div>Slides</div>;
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
}) => {
  const slides = await axios
    .get('/api/slides', {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      slides,
    },
  };
};

export default Slides;
