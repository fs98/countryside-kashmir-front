import Head from 'next/head';
import { AppLayout } from '@/layouts/AppLayout';

const Mail = () => (
  <AppLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - Mail</h2>
    }>
    <Head>
      <title>Countryside Kashmir - Mail</title>
    </Head>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200 w-full">Mail Form Here</div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default Mail;
