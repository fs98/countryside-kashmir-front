import { useState } from 'react';
import Head from 'next/head';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';
import { Button } from '@/components/Button/Button';

type UserProps = {
  id: Number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

type MessageProps = {
  id: Number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  content: string;
  user_id: Number;
  user: UserProps;
  created_at: string;
  updated_at: string;
};

type BookingProps = {
  id: Number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  country: string;
  persons: Number;
  adults: Number;
  children: Number;
  arrival_date: string;
  days: Number;
  nights: Number;
  package_id: Number;
  user_id: Number;
  created_at: string;
  updated_at: string;
  user: UserProps;
};

const getFullName = (params: GridValueGetterParams) =>
  `${params.row.first_name || ''} ${params.row.last_name || ''}`;

const Dashboard = ({
  messages,
  bookings,
}: {
  messages: MessageProps[];
  bookings: BookingProps[];
}) => {
  const deleteMessage = (messageId: Number) => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      axios
        .delete(`/api/messages/${messageId}`)
        .then(res => {
          setDisplayed({
            rows: messages.filter(message => message.id !== messageId),
            columns: messagesColumns,
            heading: 'Messages',
          });
          window.alert(res.data.message);
        })
        .catch(error => {
          window.alert(error.response.data.error);
        });
    }
  };

  const messagesColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 160,
      valueGetter: getFullName,
    },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'content', headerName: 'Content', width: 150 },
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 150 },
    { field: 'user', headerName: 'User', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <Button onClick={() => deleteMessage(row.id)}>Delete</Button>
      ),
    },
  ];

  const bookingsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'persons', headerName: 'Persons', width: 150 },
    { field: 'adults', headerName: 'Adults', width: 150 },
    { field: 'children', headerName: 'Children', width: 150 },
    { field: 'days', headerName: 'Days', width: 150 },
    { field: 'nights', headerName: 'Nights', width: 150 },
    // { field: 'user_id', headerName: 'User ID', width: 150 },
    // { field: 'package_id', headerName: 'Package ID', width: 150 },
    { field: 'arrival_date', headerName: 'Arrival Date', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 150 },
    // { field: 'user', headerName: 'User', width: 150 },
  ];

  const [displayed, setDisplayed] = useState<{
    rows: any;
    columns: any;
    heading: string;
  }>({
    rows: messages,
    columns: messagesColumns,
    heading: 'Messages',
  });

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard - {displayed.heading}
        </h2>
      }>
      <Head>
        <title>Countryside Kashmir - Dashboard</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="space-x-2 mb-2">
            <Button
              className={displayed.rows === messages ? 'bg-gray-400' : ''}
              onClick={() =>
                setDisplayed({
                  rows: messages,
                  columns: messagesColumns,
                  heading: 'Messages',
                })
              }>
              Messages
            </Button>
            <Button
              className={displayed.rows === bookings ? 'bg-gray-400' : ''}
              onClick={() =>
                setDisplayed({
                  rows: bookings,
                  columns: bookingsColumns,
                  heading: 'Bookings',
                })
              }>
              Bookings
            </Button>
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 w-full">
              <DataGrid rows={displayed.rows} columns={displayed.columns} autoHeight />
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
    .then(res => res.data.data)
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
