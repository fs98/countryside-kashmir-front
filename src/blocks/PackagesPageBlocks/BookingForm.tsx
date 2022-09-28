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
import _ from 'lodash';
import { axios } from '@/lib/axios';

type FormData = {
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

type FormFieldRulesProps = {
  name: string;
  value: unknown;
  text: string;
};

type FormFieldProps = {
  id: keyof FormData;
  label: string;
  type: 'text' | 'number' | 'date' | 'email';
  rules: FormFieldRulesProps[];
};

type BookingFormFieldProps = FormFieldProps[];

const BookingForm = () => {
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(
    ({
      name,
      email,
      phoneNumber,
      address,
      city,
      country,
      persons,
      adults,
      children,
      arrivalDate,
      days,
      nights,
    }) => {
      axios
        .post('/api/guest/bookings', {
          name: name,
          email: email,
          phone_number: phoneNumber,
          address: address,
          city: city,
          country: country,
          persons: persons,
          adults: adults,
          children: children,
          arrival_date: arrivalDate,
          days: days,
          nights: nights,
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
              title: 'Validation failed',
              type: 'error',
            });
          }

          setTimeout(() => {
            setMessage(undefined);
          }, 3000);
        });
    },
  );

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  const bookingFormFields: BookingFormFieldProps = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Name is required.',
        },
        {
          name: 'maxLength',
          value: 64,
          text: 'Name should be shorther than 64 characters.',
        },
      ],
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      rules: [
        {
          name: 'maxLength',
          value: 64,
          text: 'Email should be shorther than 64 characters.',
        },
      ],
    },
    {
      id: 'phoneNumber',
      label: 'Phone number',
      type: 'text',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Phone number is required.',
        },
        {
          name: 'maxLength',
          value: 128,
          text: 'Phone number should be shorther than 128 characters.',
        },
      ],
    },
    {
      id: 'address',
      label: 'Address',
      type: 'text',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Address is required.',
        },
        {
          name: 'maxLength',
          value: 128,
          text: 'Address should be shorther than 128 characters.',
        },
      ],
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'City is required.',
        },
        {
          name: 'maxLength',
          value: 128,
          text: 'City should be shorther than 128 characters.',
        },
      ],
    },
    {
      id: 'country',
      label: 'Country',
      type: 'text',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Country is required.',
        },
        {
          name: 'maxLength',
          value: 128,
          text: 'Country should be shorther than 128 characters.',
        },
      ],
    },
    {
      id: 'persons',
      label: 'Persons',
      type: 'number',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Number of persons is required.',
        },
        {
          name: 'min',
          value: 1,
          text: 'Number of persons should be greater than 1.',
        },
      ],
    },
    {
      id: 'adults',
      label: 'Adults',
      type: 'number',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Number of adults is required.',
        },
        {
          name: 'min',
          value: 1,
          text: 'Number of adults should be greater than 1.',
        },
      ],
    },
    {
      id: 'children',
      label: 'Children',
      type: 'number',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Number of children is required.',
        },
        {
          name: 'min',
          value: 1,
          text: 'Number of children should be greater than 1.',
        },
      ],
    },
    {
      id: 'arrivalDate',
      label: 'Arrival date',
      type: 'date',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Arrival date is required.',
        },
      ],
    },
    {
      id: 'days',
      label: 'Days',
      type: 'number',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Number of days is required.',
        },
        {
          name: 'min',
          value: 1,
          text: 'Number of days should be greater than 1.',
        },
      ],
    },
    {
      id: 'nights',
      label: 'Nights',
      type: 'number',
      rules: [
        {
          name: 'required',
          value: true,
          text: 'Number of nights is required.',
        },
        {
          name: 'min',
          value: 1,
          text: 'Number of nights should be greater than 1.',
        },
      ],
    },
  ];

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {bookingFormFields.map(field => {
            const errorHelperText =
              errors?.[field.id]?.type &&
              field.rules.find(err => err.name === errors[field.id].type);

            return (
              <FormControl key={field.id} fullWidth={true} color="warning">
                <InputLabel htmlFor={field.id}>{field.label}</InputLabel>

                <Input
                  {...register(
                    field.id,
                    _.fromPairs(field.rules.map(rule => [rule.name, rule.value])),
                  )}
                  id={field.id}
                  type={field.type}
                />

                {errorHelperText && (
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
