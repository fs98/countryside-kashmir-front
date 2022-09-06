import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import MainNavbar from './MainNavbar';

export type LayoutProps = PropsWithChildren & {
  title: string;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <MainNavbar />

      <main>
        <div className="font-sans text-gray-900 antialiased">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
