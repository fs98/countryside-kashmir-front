import { FormData } from './BookingForm';

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

export const bookingFormFields: BookingFormFieldProps = [
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
        name: 'max',
        value: 10,
        text: 'Number of children should be lower than 10.',
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
