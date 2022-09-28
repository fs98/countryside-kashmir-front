import { Alert, Button, Fade, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
        })
        .finally(() => {});
    },
  );

  const [message, setMessage] = useState<{ title: string; type: 'success' | 'error' }>();

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="name">Name</InputLabel>

          <Input {...register('name', { required: true, maxLength: 64 })} id="name" />

          {errors.name?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Name is required.
            </FormHelperText>
          )}
          {errors.name?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              Name should be shorther than 64 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            {...register('email', { required: false, maxLength: 128 })}
            type="email"
            id="email"
          />
          {errors.email?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              Email should be shorther than 64 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="phone-number">Phone number</InputLabel>

          <Input
            {...register('phoneNumber', { required: true, maxLength: 128 })}
            id="phone-number"
          />

          {errors.phoneNumber?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Phone number is required.
            </FormHelperText>
          )}
          {errors.phoneNumber?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              Phone number should be shorther than 128 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="address">Adress</InputLabel>

          <Input {...register('address', { required: true, maxLength: 128 })} id="address" />

          {errors.address?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Address is required.
            </FormHelperText>
          )}
          {errors.address?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              Address should be shorther than 128 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="city">City</InputLabel>

          <Input {...register('city', { required: true, maxLength: 128 })} id="city" />

          {errors.city?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              City is required.
            </FormHelperText>
          )}
          {errors.city?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              City should be shorther than 128 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="country">Country</InputLabel>

          <Input {...register('country', { required: true, maxLength: 128 })} id="country" />

          {errors.country?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Country is required.
            </FormHelperText>
          )}
          {errors.country?.type === 'maxLength' && (
            <FormHelperText error id="component-error-text">
              Country should be shorther than 128 characters.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="persons">Persons</InputLabel>

          <Input {...register('persons', { required: true, min: 1 })} type="number" id="persons" />

          {errors.persons?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Number of persons is required.
            </FormHelperText>
          )}
          {errors.persons?.type === 'min' && (
            <FormHelperText error id="component-error-text">
              Number of persons should be greater than 1.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="adults">Adults</InputLabel>

          <Input {...register('adults', { required: true, min: 1 })} type="number" id="adults" />

          {errors.adults?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Number of adults is required.
            </FormHelperText>
          )}
          {errors.adults?.type === 'min' && (
            <FormHelperText error id="component-error-text">
              Number of adults should be greater than 1.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="children">Children</InputLabel>

          <Input
            {...register('children', { required: true, min: 1 })}
            type="number"
            id="children"
          />

          {errors.children?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Number of adults is required.
            </FormHelperText>
          )}
          {errors.children?.type === 'min' && (
            <FormHelperText error id="component-error-text">
              Number of adults should be greater than 1.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="arrival-date">Arrival date</InputLabel>

          <Input {...register('arrivalDate', { required: true })} type="date" id="arrival-date" />

          {errors.arrivalDate?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Arrival date is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="days">Days</InputLabel>

          <Input {...register('days', { required: true, min: 1 })} type="number" id="days" />

          {errors.days?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Number of adults is required.
            </FormHelperText>
          )}
          {errors.days?.type === 'min' && (
            <FormHelperText error id="component-error-text">
              Number of adults should be greater than 1.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth={true} color="warning" sx={{ marginTop: 4 }}>
          <InputLabel htmlFor="nights">Nights</InputLabel>

          <Input {...register('nights', { required: true, min: 1 })} type="number" id="nights" />

          {errors.nights?.type === 'required' && (
            <FormHelperText error id="component-error-text">
              Number of nights is required.
            </FormHelperText>
          )}
          {errors.nights?.type === 'min' && (
            <FormHelperText error id="component-error-text">
              Number of nights should be greater than 1.
            </FormHelperText>
          )}
        </FormControl>

        <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
          Submit
        </Button>
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
