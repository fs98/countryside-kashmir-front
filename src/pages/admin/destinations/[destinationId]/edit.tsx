import { useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { DestinationForm } from '@/blocks/DestinationsPageBlocks/DestinationForm';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { FormDataProps } from '@/pages/admin/destinations/create';
import { Message } from '@/types/message';
import { Destination } from '@/types/resources';
import { validateImage } from '@/utils/validateImage';

type EditDestinationProps = {
  destination: Destination;
};

const EditDestination = ({ destination }: EditDestinationProps) => {
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
        defaultValue: destination.image_alt,
      },
    },
    {
      id: 'name',
      attributes: {
        defaultValue: destination.name,
      },
    },
    {
      id: 'keywords',
      attributes: {
        defaultValue: destination.keywords,
      },
    },
    {
      id: 'editor',
      attributes: {
        defaultValue: destination.description,
      },
    },
  ];

  const onSubmit = handleSubmit(({ image, imageAlt, keywords, name, description }) => {
    const formData = new FormData();

    formData.append('image_alt', imageAlt);
    formData.append('keywords', keywords.toLowerCase());
    if (name !== destination.name) {
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

      formData.append('image', image[0]);
    }

    // Make a request
    axios
      .post(`/api/destinations/${destination.id}?_method=PUT`, formData, {
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
    <PageLayout resource="destinations">
      {message && <div>{message.title}</div>}

      <DestinationForm
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
  params: { destinationId },
}) => {
  const destination = await axios
    .get<{ data: Destination[] }>(`/api/destinations/${destinationId}`, {
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

  if (!destination) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination,
    },
  };
};

export default EditDestination;
