import Head from 'next/head';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AppLayout } from '@/layouts/AppLayout';

type FormData = {
  image: File;
  imageAlt: string;
  order: number;
  title: string;
  subtitle: string;
};

const Slides = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    console.log(data);
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
              <form onSubmit={onSubmit}>
                <FormControl color="warning" fullWidth>
                  <InputLabel htmlFor="image">Image</InputLabel>

                  <Input {...register('image', { required: true })} id="image" type="file" />

                  {errors.image?.type === 'required' && (
                    <FormHelperText error id="component-error-text">
                      Image is required.
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl color="warning" fullWidth>
                  <InputLabel htmlFor="image-alt">Image Alt</InputLabel>

                  <Input {...register('imageAlt', { required: true, max: 64 })} id="image-alt" />

                  {errors.imageAlt?.type === 'required' && (
                    <FormHelperText error id="component-error-text">
                      Image Alt is required.
                    </FormHelperText>
                  )}
                  {errors.imageAlt?.type === 'max' && (
                    <FormHelperText error id="component-error-text">
                      Image Alt must be shorter than 64 characters.
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl color="warning" fullWidth>
                  <InputLabel htmlFor="order">Order</InputLabel>

                  <Input {...register('order', { required: true })} id="order" type="number" />

                  {errors.order?.type === 'required' && (
                    <FormHelperText error id="component-error-text">
                      Order is required.
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl color="warning" fullWidth>
                  <InputLabel htmlFor="title">Title</InputLabel>

                  <Input {...register('title', { max: 64 })} id="title" />

                  {errors.title?.type === 'max' && (
                    <FormHelperText error id="component-error-text">
                      Title must be shorter than 64 characters.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="subtitle">Subtitle</InputLabel>

                  <Input {...register('subtitle', { max: 32 })} id="subtitle" />

                  {errors.title?.type === 'max' && (
                    <FormHelperText error id="component-error-text">
                      Subtitle must be shorter than 32 characters.
                    </FormHelperText>
                  )}
                </FormControl>
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
