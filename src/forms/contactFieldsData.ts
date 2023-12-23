import { FormData } from '@/pages/contact-us';

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

type ContactUsFormFieldProps = FormFieldProps[];

export const contactUsFormFields: ContactUsFormFieldProps = [
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
