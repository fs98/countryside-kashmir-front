import { useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { DestinationForm } from '@/blocks/DestinationsPageBlocks/DestinationForm';
import { useAuth } from '@/hooks/auth';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Message } from '@/types/message';

export type FormDataProps = {
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
  } = useForm<FormDataProps>();

  const [message, setMessage] = useState<Message>();
  const { user } = useAuth({ middleware: 'auth' });

  const onSubmit = handleSubmit(({ image, imageAlt, name, description, keywords }) => {
    if (image[0]?.type !== 'image/jpeg' && image[0]?.type !== 'image/png') {
      return setError('image', { type: 'filetype' });
    }

    if (image[0]?.size >= 5000000) {
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
    <PageLayout resource="destinations">
      {message && <div>{message.title}</div>}

      <DestinationForm
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        editing={false}
        inputAttributes={[]}
        control={control}
      />
    </PageLayout>
  );
};

export default Destinations;
