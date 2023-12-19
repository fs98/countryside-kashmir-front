import { ruleFile, ruleMax, ruleRequired } from '@/utils/formRules';

import { FormDataProps } from '../pages/admin/slides/create';

type FormFieldRulesProps = {
  name: string;
  value?: unknown;
  text: string;
};

type FormFieldProps = {
  id: keyof FormDataProps;
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
        ruleRequired({ text: 'Image is required' }),
        ruleFile('filetype', 'Image must be of type jpg,jpeg or png.'),
        ruleFile('filesize', 'Image must not exceed 5MB.'),
      ],
      updating: [
        ruleFile('filetype', 'Image must be of type jpg,jpeg or png.'),
        ruleFile('filesize', 'Image must not exceed 5MB.'),
      ],
    },
  },
  {
    id: 'imageAlt',
    label: 'Image Alt',
    type: 'text',
    rules: {
      creating: [
        ruleRequired({ text: 'Image Alt is required.' }),
        ruleMax({ text: 'Image Alt must be shorter than 64 characters.' }),
      ],
      updating: [
        ruleRequired({ text: 'Image Alt is required.' }),
        ruleMax({ text: 'Image Alt must be shorter than 64 characters.' }),
      ],
    },
  },
  {
    id: 'order',
    label: 'Order',
    type: 'number',
    rules: {
      creating: [ruleRequired({ text: 'Order is required.' })],
      updating: [ruleRequired({ text: 'Order is required.' })],
    },
  },
  {
    id: 'title',
    label: 'Title',
    type: 'text',
    rules: {
      creating: [ruleMax({ text: 'Title must be shorter than 64 characters.' })],
      updating: [ruleMax({ text: 'Title must be shorter than 64 characters.' })],
    },
  },
  {
    id: 'subtitle',
    label: 'Subtitle',
    type: 'text',
    rules: {
      creating: [ruleMax({ text: 'Subtitle must be shorter than 32 characters.', value: 32 })],
      updating: [ruleMax({ text: 'Subtitle must be shorter than 32 characters.', value: 32 })],
    },
  },
];
