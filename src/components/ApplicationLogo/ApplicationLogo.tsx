import Logo from '../../../public/inline-logo.png';

type ApplicationLogoProps = {
  className?: string;
};

export const ApplicationLogo = ({ className }: ApplicationLogoProps): JSX.Element => (
  <img src={Logo.src} alt="" className={`block w-30 fill-current text-gray-600 ${className}`} />
);
