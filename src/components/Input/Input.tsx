import { FC, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  disabled?: boolean;
  className: string;
};

export const Input: FC<InputProps> = ({ disabled = false, className, ...props }) => (
  <input
    disabled={disabled}
    className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
    {...props}
  />
);
