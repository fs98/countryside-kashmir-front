import AddIcon from '@mui/icons-material/Add';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { SlidesProps } from '../..';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';
import { Card } from '@/components/Card/Card';

type AdminSlidesProps = SlidesProps & {
  id: number;
  order: number;
  created_at: string;
  updated_at: string;
};

const Slides = (props: { slides: AdminSlidesProps[] }): JSX.Element => {
  const [slides, setSlides] = useState<AdminSlidesProps[]>(props.slides);

  const handleDelete = (slideId: Number) => {
    axios
      .delete(`/api/slides/${slideId}`)
      .then(res => {
        setSlides(slides.filter(slide => slide.id !== slideId));
        window.alert(res.data.message);
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Slides</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 pb-0">
              <Link href="slides/create">
                <a className="btn outline p-2 rounded-sm outline-blue-500 text-blue-500 hover:outline-blue-700 hover:text-blue-700">
                  <AddIcon />
                  New Slide
                </a>
              </Link>
            </div>
            <div className="p-6 bg-white border-b border-gray-200 w-full grid grid-cols-3 gap-4">
              {slides.map(slide => (
                <Card
                  data={slide}
                  key={slide.id}
                  onDelete={() => handleDelete(slide.id)}
                  editUrl={`slides/${slide.id}/edit`}
                  tags={['photography', 'travel', 'winter']}
                />
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
