import { FC, PropsWithChildren } from 'react';

import Head from 'next/head';

export const GuestLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>Laravel</title>
    </Head>

    <div className="font-sans text-gray-900 antialiased">{children}</div>
  </>
);
