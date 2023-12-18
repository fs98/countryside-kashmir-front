import { useMemo, useState } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import { SlideForm } from '@/blocks/SlidesPageBlocks/SlideForm';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Message } from '@/types/message';

import { FormDataProps } from '../create';

export type InputAttributesProps = {
  id: string;
  attributes: {
    defaultValue: string | number;
  };
};

const Slide = ({ slide }) => {
  const inputAttributes = useMemo<InputAttributesProps[]>(
    () => [
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
    ],
    [slide.image_alt, slide.order, slide.subtitle, slide.title],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataProps>();

  const onSubmit = handleSubmit(({ image, imageAlt, order, title, subtitle }) => {
    const formData = new FormData();

    formData.append('image_alt', imageAlt);
    formData.append('order', order);
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    const imageItem = image?.[0];

    if (imageItem) {
      if (imageItem.type !== 'image/jpeg' && imageItem.type !== 'image/png') {
        return setError('image', { type: 'filetype' });
      }

      if (imageItem.size >= 5000000) {
        return setError('image', { type: 'filesize' });
      }

      formData.append('image', imageItem);
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

  const [message, setMessage] = useState<Message>();

  return (
    <PageLayout resource="slides">
      {message && <div>{message.title}</div>}

      <SlideForm
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        editing={true}
        inputAttributes={inputAttributes}
      />
    </PageLayout>
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
