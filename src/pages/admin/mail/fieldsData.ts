import { FormData } from '.';

type FormFieldRulesProps = {
  name: string;
  value?: unknown;
  text: string;
};

type FormFieldProps = {
  id: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'textarea';
  rules: FormFieldRulesProps[];
};

export const mailFormFields: FormFieldProps[] = [
  {
    id: 'receiver',
    label: 'To:',
    type: 'email',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Receiver is required.',
      },
    ],
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Subject is required.',
      },
    ],
  },
  {
    id: 'message',
    label: 'Content',
    type: 'textarea',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Content is required.',
      },
    ],
  },
];
