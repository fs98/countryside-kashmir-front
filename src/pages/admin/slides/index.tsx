import { useState } from 'react';

import { Card } from '@/components/Card/Card';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';

import { SlidesProps } from '../..';

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
    <PageLayout resource="slides" isOverview>
      {slides.map(slide => (
        <Card
          data={slide}
          key={slide.id}
          onDelete={() => handleDelete(slide.id)}
          editUrl={`slides/${slide.id}/edit`}
        />
      ))}
    </PageLayout>
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
