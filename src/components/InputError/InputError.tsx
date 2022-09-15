import { FC } from 'react';

export type InputErrorProps = {
  className: string;
  messages: string[];
};

const InputError: FC<InputErrorProps> = ({ messages = [], className = '' }) => (
  <>
    {messages.length > 0 && (
      <>
        {messages.map((message, index) => (
          <p className={`${className} text-sm text-red-600`} key={index}>
            {message}
          </p>
        ))}
      </>
    )}
  </>
);

export default InputError;
