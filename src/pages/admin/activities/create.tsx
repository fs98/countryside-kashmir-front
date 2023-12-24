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

const Activities = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [message, setMessage] = useState<Message>();
  const { user } = useAuth({ middleware: 'auth' });

  const onSubmit = handleSubmit(({ image, imageAlt, name, keywords, description }) => {
    const formData = new FormData();

    const imageItem = image?.[0];

    if (imageItem) {
      const errorType = validateImage(imageItem);
      if (errorType) {
        return setError('image', { type: errorType });
      }
    }

    formData.append('image', imageItem);
    formData.append('image_alt', imageAlt);
    formData.append('keywords', keywords.toLowerCase());
    formData.append('name', name);
    formData.append('description', JSON.stringify(description));
    formData.append('author_id', user.id);

    axios
      .post('/api/activities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setMessage({
          title: res.data.message,
          type: 'success',
        });
        Router.push('/admin/activities');
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
    <PageLayout resource="activities">
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

export default Activities;
