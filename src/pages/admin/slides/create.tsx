import { useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { SlideForm } from '@/blocks/SlidesPageBlocks/SlideForm';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Message } from '@/types/message';
import { validateImage } from '@/utils/validateImage';

export type FormDataProps = {
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
  } = useForm<FormDataProps>();

  const onSubmit = handleSubmit(({ image, imageAlt, order, title, subtitle }) => {
    const formData = new FormData();

    const imageItem = image?.[0];

    if (imageItem) {
      const errorType = validateImage(imageItem);
      if (errorType) {
        return setError('image', { type: errorType });
      }
      formData.append('image', imageItem);
    }

    formData.append('image', imageItem);
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
        if (error.response?.status === 500 || error.response?.status === 422) {
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

  const [message, setMessage] = useState<Message>();

  return (
    <PageLayout resource="slides">
      {message && <div>{message.title}</div>}
      <SlideForm
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        editing={false}
        inputAttributes={[]}
      />
    </PageLayout>
  );
};

export default Slides;
