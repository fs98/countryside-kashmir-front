import { useState } from 'react';

import { Card } from '@/components/Card/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Package } from '@/types/resources';

type PackagesProps = {
  packages: Package[];
};

const Packages = (props: PackagesProps) => {
  const [packages, setPackages] = useState<Package[]>(props.packages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | null }>({ id: null });

  const handleDelete = (packageId: number) => {
    axios
      .delete(`/api/packages/${packageId}`)
      .then(() => {
        setPackages(packages.filter(item => item.id !== packageId));
        setIsDialogOpen(false);
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <PageLayout resource="packages" isOverview showAddButton>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleDelete(deleteItem.id)}
      />

      {packages.map(item => (
        <Card
          data={{ ...item, title: item.name }}
          key={item.id}
          onDelete={() => {
            setIsDialogOpen(true);
            setDeleteItem({ id: item.id });
          }}
          editUrl={`packages/${item.id}/edit`}
        />
      ))}
    </PageLayout>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie, host },
  },
}) => {
  const packages = await axios
    .get<{ data: Package[] }>('api/packages', {
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
      packages,
    },
  };
};

export default Packages;
