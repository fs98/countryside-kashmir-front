import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Head from 'next/head';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 210 },
  { field: 'name', headerName: 'Name', width: 210 },
  { field: 'slug', headerName: 'Slug', width: 210 },
  { field: 'created_at', headerName: 'Created At', width: 210 },
  { field: 'updated_at', headerName: 'Updated At', width: 210 },
];

const Categories = ({ categories }) => (
  <AppLayout
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}>
    <Head>
      <title>Countryside Kashmir - Categories</title>
    </Head>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200 w-full">
            <DataGrid rows={categories} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
}) => {
  const categories = await axios
    .get('/api/categories', {
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
      categories,
    },
  };
};

export default Categories;
