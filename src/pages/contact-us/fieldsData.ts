export const bookingFormFields = [
  {
    id: 'firstName',
    label: 'First name',
    type: 'text',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Name is required.',
      },
    ],
  },
  {
    id: 'lastName',
    label: 'Last name',
    type: 'text',
    rules: [],
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
    id: 'content',
    label: 'Content',
    type: 'text',
    rules: [],
  },
];
