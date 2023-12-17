import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { AppLayout } from '@/layouts/AppLayout';
import { Message } from '@/types/message';
import { DestinationForm } from '@/blocks/DestinationsPageBlocks/DestinationForm';
import { axios } from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

export type FormData = {
  image: File;
  imageAlt: string;
  name: string;
  keywords: string;
  description: {
    time: number;
    blocks: any[];
  };
};

const Destinations = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [message, setMessage] = useState<Message>();
  const { user } = useAuth({ middleware: 'auth' });

  const onSubmit = handleSubmit(({ image, imageAlt, name, description, keywords }) => {
    if (image[0].type !== 'image/jpeg' && image[0].type !== 'image/png') {
      return setError('image', { type: 'filetype' });
    }

    if (image[0].size >= 5000000) {
      return setError('image', { type: 'filesize' });
    }

    if (!description || description?.blocks.length === 0) {
      setError('description', {
        type: 'required',
        message: 'The content is required.',
      });
    }

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('image_alt', imageAlt);
    formData.append('name', name);
    formData.append('keywords', keywords.toLowerCase());
    formData.append('description', JSON.stringify(description));
    formData.append('author_id', user.id);

    axios
      .post('/api/destinations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setMessage({
          title: res.data.message,
          type: 'success',
        });
        Router.push('/admin/destinations');
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

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Destinations</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 grid gap-5">
              {message && <div>{message.title}</div>}
              <DestinationForm
                onSubmit={onSubmit}
                errors={errors}
                register={register}
                editing={false}
                inputAttributes={[]}
                control={control}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Destinations;
