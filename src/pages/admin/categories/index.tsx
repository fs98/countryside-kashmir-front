import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import Head from 'next/head';
import Link from 'next/link';

import moment from 'moment';

import { Button } from '@/components/Button/Button';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';

type CategoryProps = {
  id: Number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type CategoriesProps = {
  categories: CategoryProps[];
};

const Categories = (props: CategoriesProps) => {
  const [categories, setCategories] = useState<CategoryProps[]>(props.categories);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{ id: Number | null }>({ id: null });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'name', headerName: 'Name', width: 210, editable: true },
    { field: 'slug', headerName: 'Slug', width: 210 },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 210,
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.row.created_at).format('lll');
      },
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      width: 210,
      valueGetter: (params: GridValueGetterParams) => {
        return moment(params.row.updated_at).format('lll');
      },
    },
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

  const handleDelete = (categoryId: Number) => {
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

  const handleEdit = (data: GridRowParams) => {
    axios
      .post(`/api/categories/${data.id}?_method=PUT`, {
        name: data.row.name,
      })
      .then(result => {
        const updatedCategory = result.data.data;

        // Update the state with the new data
        setCategories(prevState => {
          return prevState.map(category =>
            category.id === updatedCategory.id ? updatedCategory : category,
          );
        });

        window.alert('Category successfully updated!');
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
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
              <Button onClick={() => handleDelete(deleteItem.id)} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 pb-0">
              <Link href="categories/create">
                <a className="btn outline p-2 rounded-sm outline-blue-500 text-blue-500 hover:outline-blue-700 hover:text-blue-700">
                  <AddIcon />
                  New Category
                </a>
              </Link>
            </div>
            <div className="p-6 bg-white border-b border-gray-200 w-full h-screen">
              <DataGrid
                editMode="row"
                rows={categories}
                columns={columns}
                onRowEditStop={handleEdit}
              />
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