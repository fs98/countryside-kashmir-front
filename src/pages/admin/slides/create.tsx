import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Router from 'next/router';
import { SlideForm } from './slideForm';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

export type FormData = {
  image: File;
  imageAlt: string;
  order: string;
  title: string;
  subtitle: string;
};

const Slides = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ image, imageAlt, order, title, subtitle }) => {
    if (image[0].type !== 'image/jpeg' && image[0].type !== 'image/png') {
      return setError('image', { type: 'filetype' });
    }

    if (image[0].size >= 5000000) {
      return setError('image', { type: 'filesize' });
    }

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('image_alt', imageAlt);
    formData.append('order', order);
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    axios
      .post('/api/slides', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setMessage({
          title: res.data.message,
          type: 'success',
        });
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
                editing={false}
                inputAttributes={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Slides;
