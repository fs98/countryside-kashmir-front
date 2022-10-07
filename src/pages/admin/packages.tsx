import Head from 'next/head';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

const Packages = ({ packages }) => (
  <AppLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Packages</h2>
    }>
    <Head>
      <title>Countryside Kashmir - Packages</title>
    </Head>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200 w-full h-96">
            {JSON.stringify(packages)}
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
  const packages = await axios
    .get('api/packages', {
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
      packages,
    },
  };
};

export default Packages;
