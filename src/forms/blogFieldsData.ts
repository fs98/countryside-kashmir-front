import { FormFieldProps } from '@/components/Form/Form';
import { ruleRequired } from '@/utils/formRules';

import { globalFieldsData } from './globalFieldsData';

export const blogFieldsData: FormFieldProps[] = [
  ...globalFieldsData,
  {
    id: 'publishedAt',
    label: 'Published At',
    type: 'date',
    rules: {
      creating: [ruleRequired({ text: 'Published At is required.' })],
      updating: [],
    },
  },
];
