import Head from 'next/head';
import { SlidesProps } from '..';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

type adminSlidesProps = SlidesProps & {
  id: number;
  order: number;
  created_at: string;
  updated_at: string;
};

const Slides = ({ slides }: { slides: adminSlidesProps[] }): JSX.Element => {
  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Slides</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 w-full h-96">
              {JSON.stringify(slides)}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
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
