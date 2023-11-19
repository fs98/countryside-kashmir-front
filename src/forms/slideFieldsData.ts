import { FormData } from '../pages/admin/slides/create';

type FormFieldRulesProps = {
  name: string;
  value?: unknown;
  text: string;
};

type FormFieldProps = {
  id: keyof FormData;
  label: string;
  type: 'text' | 'number' | 'file';
  rules: {
    creating: FormFieldRulesProps[];
    updating: FormFieldRulesProps[];
  };
};

export const slideFormFields: FormFieldProps[] = [
  {
    id: 'image',
    label: 'Image (png, jpg, jpeg)',
    type: 'file',
    rules: {
      creating: [
        {
          name: 'required',
          value: true,
          text: 'Image is required.',
        },
        {
          name: 'filetype',
          text: 'Image must be of type jpg,jpeg or png.',
        },
        {
          name: 'filesize',
          text: 'Image must not exceed 5MB.',
        },
      ],
      updating: [
        {
          name: 'filetype',
          text: 'Image must be of type jpg,jpeg or png.',
        },
        {
          name: 'filesize',
          text: 'Image must not exceed 5MB.',
        },
      ],
    },
  },
  {
    id: 'imageAlt',
    label: 'Image Alt',
    type: 'text',
    rules: {
      creating: [
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
      updating: [
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
  },
  {
    id: 'order',
    label: 'Order',
    type: 'number',
    rules: {
      creating: [
        {
          name: 'required',
          value: true,
          text: 'Order is required.',
        },
      ],
      updating: [
        {
          name: 'required',
          value: true,
          text: 'Order is required.',
        },
      ],
    },
  },
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    rules: {
      creating: [
        {
          name: 'max',
          value: 64,
          text: 'Title must be shorter than 64 characters.',
        },
      ],
      updating: [
        {
          name: 'max',
          value: 64,
          text: 'Title must be shorter than 64 characters.',
        },
      ],
    },
  },
  {
    id: 'subtitle',
    label: 'Subtitle',
    type: 'text',
    rules: {
      creating: [
        {
          name: 'max',
          value: 32,
          text: 'Title must be shorter than 32 characters.',
        },
      ],
      updating: [
        {
          name: 'max',
          value: 32,
          text: 'Title must be shorter than 32 characters.',
        },
      ],
    },
  },
];
