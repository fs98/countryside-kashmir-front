import { useState } from 'react';

import Router from 'next/router';

import moment from 'moment';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { blogFieldsData } from '@/forms/blogFieldsData';
import { useAuth } from '@/hooks/auth';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { FormDataProps } from '@/types/global';
import { Message } from '@/types/message';
import { validateImage } from '@/utils/validateImage';

const Blogs = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [message, setMessage] = useState<Message>();
  const { user } = useAuth({ middleware: 'auth' });

  const onSubmit = handleSubmit(({ image, imageAlt, name, keywords, description, publishedAt }) => {
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
    formData.append('keywords', keywords.toLowerCase());
    formData.append('title', name);
    formData.append('content', JSON.stringify(description));
    formData.append('author_id', user.id);

    const publishedAtISO = moment(publishedAt).format();
    formData.append('published_at', publishedAtISO);

    axios
      .post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setMessage({
          title: res.data.message,
          type: 'success',
        });
        Router.push('/admin/blogs');
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
    <PageLayout resource="blogs">
      {message && <div>{message.title}</div>}

      <Form
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        editing={false}
        inputAttributes={[]}
        control={control}
        formFields={blogFieldsData}
      />
    </PageLayout>
  );
};

export default Blogs;
