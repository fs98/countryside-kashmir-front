import Head from 'next/head';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { fromPairs } from 'lodash';
import { useState } from 'react';
import { slideFormFields } from './fieldsData';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

export type FormData = {
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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ image, imageAlt, order, title, subtitle }) => {
    const formData = new FormData();
    formData.append('image', image[0]);
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
      .then(res =>
        setMessage({
          title: res.data.message,
          type: 'success',
        }),
      )
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

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>({
    title: '',
    type: undefined,
  });

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}>
      <Head>
        <title>Countryside Kashmir - Slides</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 grid gap-5">
              <div>{message.title}</div>
              <form onSubmit={onSubmit}>
                {slideFormFields.map(({ id, label, type, rules }) => {
                  const errorHelperText =
                    errors?.[id]?.type && rules.find(err => err.name === errors[id].type);

                  return (
                    <FormControl key={id} fullWidth={true} color="warning" sx={{ marginBottom: 5 }}>
                      <InputLabel htmlFor={id} shrink>
                        {label}
                      </InputLabel>

                      <Input
                        {...register(id, fromPairs(rules.map(rule => [rule.name, rule.value])))}
                        id={id}
                        type={type}
                      />

                      {errorHelperText?.text && (
                        <FormHelperText error id="component-error-text">
                          {errorHelperText.text}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                })}
                <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Slides;
