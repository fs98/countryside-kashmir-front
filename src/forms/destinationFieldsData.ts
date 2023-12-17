import { FormData } from '../pages/admin/destinations/create';

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

export const destinationFormFields: FormFieldProps[] = [
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
    id: 'name',
    label: 'Name',
    type: 'text',
    rules: {
      creating: [
        {
          name: 'required',
          value: true,
          text: 'Name is required.',
        },
        {
          name: 'max',
          value: 64,
          text: 'Name must be shorter than 64 characters.',
        },
      ],
      updating: [
        {
          name: 'required',
          value: true,
          text: 'Name is required.',
        },
        {
          name: 'max',
          value: 64,
          text: 'Name must be shorter than 64 characters.',
        },
      ],
    },
  },
  {
    id: 'keywords',
    label: 'Keywords',
    type: 'text',
    rules: {
      creating: [
        {
          name: 'required',
          value: true,
          text: 'Keywords is required.',
        },
        {
          name: 'max',
          value: 64,
          text: 'Keywords must be shorter than 64 characters.',
        },
      ],
      updating: [
        {
          name: 'required',
          value: true,
          text: 'Keywords is required.',
        },
        {
          name: 'max',
          value: 64,
          text: 'Keywords must be shorter than 64 characters.',
        },
      ],
    },
  },
];
