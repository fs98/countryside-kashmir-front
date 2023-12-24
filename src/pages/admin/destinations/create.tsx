import { useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { useAuth } from '@/hooks/auth';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { FormDataProps } from '@/types/global';
import { Message } from '@/types/message';
import { validateImage } from '@/utils/validateImage';

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
    const formData = new FormData();

    const imageItem = image?.[0];

    if (imageItem) {
      const errorType = validateImage(imageItem);
      if (errorType) {
        return setError('image', { type: errorType });
      }
    }

    if (!description || description?.blocks.length === 0) {
      setError('description', {
        type: 'required',
        message: 'The content is required.',
      });
    }

    formData.append('image', imageItem);
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

  return (
    <PageLayout resource="destinations">
      {message && <div>{message.title}</div>}

      <Form
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
