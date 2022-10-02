import { useState } from 'react';
import Head from 'next/head';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';
import { Button } from '@/components/Button/Button';

const messagesColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  { field: 'phone_number', headerName: 'Phone Number', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'content', headerName: 'Content', width: 150 },
  { field: 'user_id', headerName: 'User ID', width: 150 },
  { field: 'created_at', headerName: 'Created At', width: 150 },
  { field: 'updated_at', headerName: 'Updated At', width: 150 },
  { field: 'user', headerName: 'User', width: 150 },
];

const Dashboard = ({ messages, bookings }) => {
  console.log(bookings);
  const [displayed, setDisplayed] = useState({
    rows: messages,
    columns: messagesColumns,
  });

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - messages</h2>
      }>
      <Head>
        <title>Countryside Kashmir - Dashboard</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="space-x-2 mb-2">
            <Button
              onClick={() =>
                setDisplayed({
                  rows: messages,
                  columns: messagesColumns,
                })
              }>
              Messages
            </Button>
            <Button>Messages</Button>
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 w-full h-96">
              <DataGrid rows={displayed.rows} columns={messagesColumns} />
            </div>
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

  const bookings = await axios
    .get('/api/bookings', {
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
      bookings,
    },
  };
};

export default Dashboard;
