import Head from 'next/head';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

const Dashboard = ({ messages }) => {
  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
      <Head>
        <title>Countryside Kashmir - Dashboard</title>
      </Head>

      {messages.map(message => (
        <div key={message.id}>{message.id}</div>
      ))}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">You're logged in!</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
}) => {
  const messages = await axios
    .get('/api/messages', {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      messages,
    },
  };
};

export default Dashboard;
