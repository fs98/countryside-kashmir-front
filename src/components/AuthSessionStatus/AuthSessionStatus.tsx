import { FC, HTMLAttributes } from 'react';

export type AuthSessionStatusProps = HTMLAttributes<HTMLDivElement> & {
  status: string;
  className: string;
};

export const AuthSessionStatus: FC<AuthSessionStatusProps> = ({ status, className, ...props }) => (
  <>
    {status && (
      <div className={`${className} font-medium text-sm text-green-600`} {...props}>
        {status}
      </div>
    )}
  </>
);
