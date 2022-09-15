import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { LinkProps } from 'next/dist/client/link';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

export type DropdownLinkProps = LinkProps & PropsWithChildren;

const DropdownLink: FC<DropdownLinkProps> = ({ children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <Link {...props}>
        <a
          className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
            active ? 'bg-gray-100' : ''
          } focus:outline-none transition duration-150 ease-in-out`}>
          {children}
        </a>
      </Link>
    )}
  </Menu.Item>
);

export type DropdownButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

export const DropdownButton: FC<DropdownButtonProps> = ({ children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
          active ? 'bg-gray-100' : ''
        } focus:outline-none transition duration-150 ease-in-out`}
        {...props}>
        {children}
      </button>
    )}
  </Menu.Item>
);

export default DropdownLink;
