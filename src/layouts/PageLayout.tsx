import { PropsWithChildren } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Head from 'next/head';
import Link from 'next/link';

import { Resource, RESOURCES } from '@/data/resources';

import { AppLayout } from './AppLayout';

type PageLayoutProps = {
  resource: Resource['name'];
  isOverview?: boolean;
};

export const PageLayout = ({
  children,
  resource,
  isOverview = false,
}: PropsWithChildren<PageLayoutProps>) => {
  const dynamicClasses = isOverview ? 'w-full grid-cols-3 gap-4' : 'gap-5';

  const variations = RESOURCES[resource];

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard - {variations.pluralCapitalized}
        </h2>
      }>
      <Head>
        <title>Countryside Kashmir - {variations.pluralCapitalized}</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {isOverview && (
              <div className="p-6 pb-0">
                <Link href={`${variations.pluralLowercase}/create`}>
                  <a className="btn outline p-2 rounded-sm outline-blue-500 text-blue-500 hover:outline-blue-700 hover:text-blue-700">
                    <AddIcon />
                    New {variations.singularCapitalized}
                  </a>
                </Link>
              </div>
            )}
            <div className={`p-6 bg-white border-b border-gray-200 grid ${dynamicClasses}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
