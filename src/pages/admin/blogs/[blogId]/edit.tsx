import { useState } from 'react';

import Router from 'next/router';

import moment from 'moment';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/Form/Form';
import { blogFieldsData } from '@/forms/blogFieldsData';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { FormDataProps } from '@/types/global';
import { Message } from '@/types/message';
import { Blog } from '@/types/resources';
import { validateImage } from '@/utils/validateImage';

type EditBlogProps = {
  blog: Blog;
};

const EditBlog = ({ blog }: EditBlogProps) => {
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
        defaultValue: blog.image_alt,
      },
    },
    {
      id: 'name',
      attributes: {
        defaultValue: blog.title,
      },
    },
    {
      id: 'keywords',
      attributes: {
        defaultValue: blog.keywords,
      },
    },
    {
      id: 'publishedAt',
      attributes: {
        defaultValue: moment(blog.published_at).format('YYYY-MM-DD'),
      },
    },
    {
      id: 'editor',
      attributes: {
        defaultValue: blog.content,
      },
    },
  ];

  const onSubmit = handleSubmit(({ image, imageAlt, keywords, name, description, publishedAt }) => {
    const formData = new FormData();

    formData.append('image_alt', imageAlt);
    formData.append('keywords', keywords.toLowerCase());
    if (name !== blog.name) {
      formData.append('name', name);
    }
    if (description) {
      formData.append('content', JSON.stringify(description));
    }

    const publishedAtISO = moment(publishedAt).format();
    formData.append('published_at', publishedAtISO);

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
      .post(`/api/blogs/${blog.id}?_method=PUT`, formData, {
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
    <PageLayout resource="blogs">
      {message && <div>{message.title}</div>}

      <Form
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        editing={true}
        inputAttributes={inputAttributes}
        control={control}
        formFields={blogFieldsData}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
  params: { blogId },
}) => {
  const blog = await axios
    .get<{ data: Blog[] }>(`/api/blogs/${blogId}`, {
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

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export default EditBlog;
