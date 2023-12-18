import { FormFieldRulesProps, ruleFile, ruleMax, ruleRequired } from '@/utils/formRules';

import { FormData } from '../pages/admin/destinations/create';

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
        ruleRequired({ text: 'Image is required.' }),
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
    id: 'name',
    label: 'Name',
    type: 'text',
    rules: {
      creating: [
        ruleRequired({ text: 'Name is required.' }),
        ruleMax({ text: 'Name must be shorter than 64 characters.' }),
      ],
      updating: [
        ruleRequired({ text: 'Name is required.' }),
        ruleMax({ text: 'Name must be shorter than 64 characters.' }),
      ],
    },
  },
  {
    id: 'keywords',
    label: 'Keywords',
    type: 'text',
    rules: {
      creating: [
        ruleRequired({ text: 'Keywords is required.' }),
        ruleMax({ text: 'Keywords must be shorter than 64 characters.' }),
      ],
      updating: [
        ruleRequired({ text: 'Keywords is required.' }),
        ruleMax({ text: 'Keywords must be shorter than 64 characters.' }),
      ],
    },
  },
];
