import {
  Alert,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fromPairs } from 'lodash';
import { axios } from '@/lib/axios';
import { bookingFormFields } from '@/forms/bookingFieldsData';

export type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  persons: number;
  adults: number;
  children: number;
  arrivalDate: string;
  days: number;
  nights: number;
};

const BookingForm = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ phoneNumber, arrivalDate, ...dataFields }: FormData) => {
    axios
      .post('/api/guest/bookings', {
        ...dataFields,
        phone_number: phoneNumber,
        arrival_date: arrivalDate,
      })
      .then(res =>
        setMessage({
          title: res.data.message,
          type: 'success',
        }),
      )
      .catch(error => {
        if (error?.response?.status === 500) {
          setMessage({
            title: error.response.data.message,
            type: 'error',
          });
        }

        if (error?.response?.status === 422) {
          setMessage({
            title: 'Validation failed',
            type: 'error',
          });
        }

        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      });
  });

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {bookingFormFields.map(({ id, label, type, rules }) => {
            const errorHelperText =
              errors?.[id]?.type && rules.find(err => err.name === errors[id].type);

            return (
              <FormControl key={id} fullWidth={true} color="warning">
                <InputLabel htmlFor={id} {...(type === 'date' && { shrink: true })}>
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

          <Button variant="outlined" color="warning" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      {message && (
        <Fade in={true}>
          <Alert sx={{ marginTop: 2 }} onClose={() => setMessage(undefined)} color={message.type}>
            {message.title}
          </Alert>
        </Fade>
      )}
    </>
  );
};

export default BookingForm;
