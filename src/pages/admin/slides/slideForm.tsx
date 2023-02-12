import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { fromPairs } from 'lodash';
import { slideFormFields } from './fieldsData';
import { InputAttributesProps } from './[slideId]/edit';

export const SlideForm = ({
  onSubmit,
  errors,
  register,
  editing,
  inputAttributes,
}): JSX.Element => {
  return (
    <form onSubmit={onSubmit}>
      {slideFormFields.map(({ id, label, type, rules }) => {
        const errorHelperText =
          errors?.[id]?.type && rules.creating.find(err => err.name === errors[id].type);

        return (
          <FormControl key={id} fullWidth={true} color="warning" sx={{ marginBottom: 5 }}>
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
      <Button variant="outlined" color="warning" type="submit" sx={{ marginTop: 4 }}>
        Submit
      </Button>
    </form>
  );
};
