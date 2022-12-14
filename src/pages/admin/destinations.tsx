import Head from 'next/head';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

const Destinations = ({ destinations }) => (
  <AppLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard - Destinations
      </h2>
    }>
    <Head>
      <title>Countryside Kashmir - Destinations</title>
    </Head>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200 w-full">
            {JSON.stringify(destinations)}
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
}) => {
  const destinations = await axios
    .get('api/destinations', {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      destinations,
    },
  };
};

export default Destinations;
