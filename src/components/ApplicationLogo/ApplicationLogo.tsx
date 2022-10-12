import Logo from '../../../public/inline-logo.png';

type ApplicationLogoProps = {
  className?: string;
};

export const ApplicationLogo = ({ className }: ApplicationLogoProps): JSX.Element => (
  <img
    src={Logo.src}
    alt=""
    className={`block h-6 w-auto fill-current text-gray-600 ${className}`}
  />
);
