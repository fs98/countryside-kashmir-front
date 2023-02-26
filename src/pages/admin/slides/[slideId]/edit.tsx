import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Router from 'next/router';
import { SlideForm } from '../slideForm';
import { axios } from '@/lib/axios';
import { AppLayout } from '@/layouts/AppLayout';

export type FormData = {
  image: File;
  imageAlt: string;
  order: string;
  title: string;
  subtitle: string;
};

export type InputAttributesProps = {
  id: string;
  attributes: {
    defaultValue: string | number;
  };
};

const Slide = ({ slide }): JSX.Element => {
  const inputAttributes: InputAttributesProps[] = [
    {
      id: 'imageAlt',
      attributes: {
        defaultValue: slide.image_alt,
      },
    },
    {
      id: 'order',
      attributes: {
        defaultValue: slide.order,
      },
    },
    {
      id: 'title',
      attributes: {
        defaultValue: slide.title,
      },
    },
    {
      id: 'subtitle',
      attributes: {
        defaultValue: slide.subtitle,
      },
    },
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ image, imageAlt, order, title, subtitle }) => {
    const formData = new FormData();

    formData.append('image_alt', imageAlt);
    formData.append('order', order);
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    if (image[0]) {
      if (image[0].type !== 'image/jpeg' && image[0].type !== 'image/png') {
        return setError('image', { type: 'filetype' });
      }

      if (image[0].size >= 5000000) {
        return setError('image', { type: 'filesize' });
      }

      formData.append('image', image[0]);
    }

    axios
      .post(`/api/slides/${slide.id}?_method=PUT`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        Router.push('/admin/slides');
      })
      .catch(error => {
        if (error.response.status === 500) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        if (error.response.status === 422) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      });
  });

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Slides</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 grid gap-5">
              {message && <div>{message.title}</div>}
              <SlideForm
                onSubmit={onSubmit}
                errors={errors}
                register={register}
                editing={true}
                inputAttributes={inputAttributes}
              />
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
  params: { slideId },
}) => {
  const slide = await axios
    .get(`/api/slides/${slideId}`, {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => res.data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!slide) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slide,
    },
  };
};

export default Slide;
