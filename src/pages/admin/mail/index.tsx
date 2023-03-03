import Head from 'next/head';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import { fromPairs } from 'lodash';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Router from 'next/router';
import { mailFormFields } from './fieldsData';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

export type FormData = {
  receiver: string;
  subject: string;
  message: string;
};

const Mail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ receiver, subject, message }) => {
    const formData = new FormData();
    formData.append('receiver', receiver);
    formData.append('subject', subject);
    formData.append('message', message);

    setLoading(true);
    axios
      .post('/api/mail/send', formData)
      .then(res => {
        setLoading(false);
        setMessage({
          title: res.data.message,
          type: 'success',
        });
        Router.push('/admin/mail');
      })
      .catch(error => {
        setLoading(false);
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Mail</h2>
      }>
      <Head>
        <title>Countryside Kashmir - Mail</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 w-full">
              {loading && <CircularProgress />}
              {message && <div>{message.title}</div>}
              <form onSubmit={onSubmit}>
                {mailFormFields.map(({ id, label, type, rules }) => {
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

export default Mail;
