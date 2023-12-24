import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import dynamic from 'next/dynamic';

import { fromPairs } from 'lodash';
import { Controller } from 'react-hook-form';

import { globalFieldsData } from '@/forms/globalFieldsData';
import { InputAttributesProps } from '@/pages/admin/slides/[slideId]/edit';
import { FormDataProps } from '@/types/global';
import { FormFieldRulesProps } from '@/utils/formRules';

const CustomEditor = dynamic(
  () => import('@/components/CustomEditor/CustomEditor').then(({ CustomEditor }) => CustomEditor),
  {
    ssr: false,
  },
);

export type FormFieldProps = {
  id: keyof FormDataProps;
  label: string;
  type: 'text' | 'number' | 'file';
  rules: {
    creating: FormFieldRulesProps[];
    updating: FormFieldRulesProps[];
  };
};

type FormProps = {
  onSubmit: any;
  errors: any;
  register: any;
  editing: any;
  inputAttributes: any;
  control: any;
  formFields?: FormFieldProps[];
};

export const Form = ({
  onSubmit,
  errors,
  register,
  editing,
  inputAttributes,
  control,
  formFields,
}: FormProps): JSX.Element => {
  const editorContent = inputAttributes.find(
    (inputProp: InputAttributesProps) => inputProp.id === 'editor',
  )?.attributes.defaultValue;

  // If formFields are not passed then use globalFieldsData
  const fields = formFields ?? globalFieldsData;

  return (
    <form onSubmit={onSubmit}>
      {fields.map(({ id, label, type, rules }) => {
        const errorHelperText =
          errors?.[id]?.type && rules.creating.find(err => err.name === errors[id].type);

        return (
          <FormControl key={id} fullWidth color="warning" sx={{ marginBottom: 5 }}>
            <InputLabel htmlFor={id} shrink>
              {label}
            </InputLabel>

            {editing && (
              <Input
                {...register(id, fromPairs(rules.updating.map(rule => [rule.name, rule.value])))}
                id={id}
                type={type}
                {...inputAttributes.find((inputProp: InputAttributesProps) => inputProp.id === id)
                  ?.attributes}
              />
            )}

            {!editing && (
              <Input
                {...register(id, fromPairs(rules.creating.map(rule => [rule.name, rule.value])))}
                id={id}
                type={type}
              />
            )}

            {errorHelperText?.text && (
              <FormHelperText error id="component-error-text">
                {errorHelperText.text}
              </FormHelperText>
            )}
          </FormControl>
        );
      })}

      {/* Custom react-hook-form handling for editor JS */}
      <FormControl fullWidth color="warning" sx={{ marginBottom: 5 }}>
        <InputLabel htmlFor="editor-js" shrink>
          Description
        </InputLabel>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => (
            <CustomEditor onChange={onChange} initialData={editorContent} />
          )}
        />
      </FormControl>

      {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}

      <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
        Submit
      </Button>
    </form>
  );
};
