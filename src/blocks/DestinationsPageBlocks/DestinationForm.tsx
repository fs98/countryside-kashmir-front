import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { fromPairs } from 'lodash';
import { Controller } from 'react-hook-form';
import { InputAttributesProps } from '../../pages/admin/slides/[slideId]/edit';
import { destinationFormFields } from '@/forms/destinationFieldsData';
import { CustomEditor } from '@/components/CustomEditor/CustomEditor';

export const DestinationForm = ({
  onSubmit,
  errors,
  register,
  editing,
  inputAttributes,
  control,
}): JSX.Element => (
  <form onSubmit={onSubmit}>
    {destinationFormFields.map(({ id, label, type, rules }) => {
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
              {...inputAttributes.filter(
                (inputProp: InputAttributesProps) => inputProp.id === id,
              )[0]?.attributes}
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
        render={({ field: { onChange } }) => <CustomEditor onChange={onChange} />}
      />
    </FormControl>

    {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}

    <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
      Submit
    </Button>
  </form>
);