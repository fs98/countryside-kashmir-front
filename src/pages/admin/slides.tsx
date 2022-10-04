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
            <div className="p-6 bg-white border-b border-gray-200 w-full grid grid-cols-3 gap-4">
              {slides.map(slide => (
                <div key={slide.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={slide.image_url} alt={slide.image_alt} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{slide.title}</div>
                    <p className="text-gray-700 text-base">{slide.subtitle}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #photography
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #travel
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #winter
                    </span>
                  </div>
                </div>
              ))}
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
