export type FormFieldRulesProps = {
  name: string;
  value?: unknown;
  text: string;
};

export const ruleRequired = ({ text }): FormFieldRulesProps => ({
  name: 'required',
  value: true,
  text,
});

export const ruleMax = ({ text, value = 64 }): FormFieldRulesProps => ({
  name: 'max',
  value,
  text,
});

export const ruleFile = (
  propName: 'filetype' | 'filesize',
  message: string,
): FormFieldRulesProps => ({
  name: propName,
  text: message,
});
