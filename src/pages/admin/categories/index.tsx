import { useState } from 'react';

import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';

import moment from 'moment';

import { Button } from '@/components/Button/Button';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { PageLayout } from '@/layouts/PageLayout';
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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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
            setIsDialogOpen(true);
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
      .then(() => {
        setCategories(prev => prev.filter(category => category.id !== categoryId));
      })
      .catch(error => {
        window.alert(error.response.data.error);
      });
    setIsDialogOpen(false);
  };

  const handleEdit = (data: GridRowParams) => {
    axios
      .post(`/api/categories/${data.id}?_method=PUT`, {
        name: data.row.name,
      })
      .then(result => {
        const updatedCategory = result.data.data;

        // Update the state with the new data
        setCategories(prev => {
          return prev.map(category =>
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
    <PageLayout resource="categories">
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleDelete(deleteItem.id)}
      />
      <DataGrid
        editMode="row"
        rows={categories}
        columns={columns}
        onRowEditStop={handleEdit}
        autoHeight
      />
    </PageLayout>
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
    .then(({ data }) => data.data)
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
