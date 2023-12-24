import { useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { FormDataProps } from '@/types/global';
import { Message } from '@/types/message';
import { Activity } from '@/types/resources';
import { validateImage } from '@/utils/validateImage';

type EditActivityProps = {
  activity: Activity;
};

const EditActivity = ({ activity }: EditActivityProps) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormDataProps>();

  const [message, setMessage] = useState<Message>();

  const inputAttributes = [
    {
      id: 'imageAlt',
      attributes: {
        defaultValue: activity.image_alt,
      },
    },
    {
      id: 'name',
      attributes: {
        defaultValue: activity.name,
      },
    },
    {
      id: 'keywords',
      attributes: {
        defaultValue: activity.keywords,
      },
    },
    {
      id: 'editor',
      attributes: {
        defaultValue: activity.description,
      },
    },
  ];

  const onSubmit = handleSubmit(({ image, imageAlt, name, keywords, description }) => {
    const formData = new FormData();

    formData.append('image_alt', imageAlt);
    formData.append('keywords', keywords.toLowerCase());
    if (name !== activity.name) {
      formData.append('name', name);
    }
    if (description) {
      formData.append('description', JSON.stringify(description));
    }

    const imageItem = image?.[0];

    if (imageItem) {
      const errorType = validateImage(imageItem);
      if (errorType) {
        return setError('image', { type: errorType });
      }
      formData.append('image', imageItem);
    }

    // Make a request
    axios
      .post(`/api/activities/${activity.id}?_method=PUT`, formData, {
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
        if (error.response.status === 500 || error.response.status === 422) {
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
        editing={true}
        inputAttributes={inputAttributes}
        control={control}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
  params: { activityId },
}) => {
  const activity = await axios
    .get<{ data: Activity[] }>(`/api/activities/${activityId}`, {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(({ data }) => data.data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (!activity) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
    },
  };
};

export default EditActivity;
