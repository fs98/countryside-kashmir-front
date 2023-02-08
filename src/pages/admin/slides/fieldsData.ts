import { FormData } from './create';

type FormFieldRulesProps = {
  name: string;
  value: unknown;
  text: string;
};

type FormFieldProps = {
  id: keyof FormData;
  label: string;
  type: 'text' | 'number' | 'file';
  rules: FormFieldRulesProps[];
};

type SlideFormFieldProps = FormFieldProps[];

export const slideFormFields: SlideFormFieldProps = [
  {
    id: 'image',
    label: 'Image (png, jpg, jpeg)',
    type: 'file',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Image is required.',
      },
    ],
  },
  {
    id: 'imageAlt',
    label: 'Image Alt',
    type: 'text',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Image Alt is required.',
      },
      {
        name: 'max',
        value: 64,
        text: 'Image Alt must be shorter than 64 characters.',
      },
    ],
  },
  {
    id: 'order',
    label: 'Order',
    type: 'number',
    rules: [
      {
        name: 'required',
        value: true,
        text: 'Order is required.',
      },
    ],
  },
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    rules: [
      {
        name: 'max',
        value: 64,
        text: 'Title must be shorter than 64 characters.',
      },
    ],
  },
  {
    id: 'subtitle',
    label: 'Subtitle',
    type: 'text',
    rules: [
      {
        name: 'max',
        value: 32,
        text: 'Title must be shorter than 32 characters.',
      },
    ],
  },
];
