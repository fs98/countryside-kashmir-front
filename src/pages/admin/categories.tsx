import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Head from 'next/head';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';
import { Button } from '@/components/Button/Button';

const Categories = props => {
  const [categories, setCategories] = useState(props.categories);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{
    id: Number | null;
  }>({
    id: null,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'name', headerName: 'Name', width: 210 },
    { field: 'slug', headerName: 'Slug', width: 210 },
    { field: 'created_at', headerName: 'Created At', width: 210 },
    { field: 'updated_at', headerName: 'Updated At', width: 210 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <Button
          onClick={() => {
            setOpenDialog(true);
            setDeleteItem({
              id: row.id,
            });
          }}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteCategory = (categoryId: Number) => {
    axios
      .delete(`/api/categories/${categoryId}`)
      .then(res => {
        setCategories(prevState => prevState.filter(category => category.id !== categoryId));

        window.alert(res.data.message);
      })
      .catch(error => {
        window.alert(error.response.data.error);
      });
    setOpenDialog(false);
  };

  return (
    <AppLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}>
      <Head>
        <title>Countryside Kashmir - Categories</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Delete item?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={() => deleteCategory(deleteItem.id)} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 w-full h-screen">
              <DataGrid rows={categories} columns={columns} />
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
