import { FC, LabelHTMLAttributes, PropsWithChildren } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren & {
    className?: string;
  };

export const Label: FC<LabelProps> = ({ className, children, ...props }) => (
  <label className={`${className} block font-medium text-sm text-gray-700`} {...props}>
    {children}
  </label>
);
