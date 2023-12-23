import { useState } from 'react';

import { Card } from '@/components/Card/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Destination } from '@/types/resources';

type DestinationsProps = {
  destinations: Destination[];
};

const Destinations = (props: DestinationsProps) => {
  const [destinations, setDestinations] = useState<Destination[]>(props.destinations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | null }>({ id: null });

  const handleDelete = (destinationId: number) => {
    axios
      .delete(`/api/destinations/${destinationId}`)
      .then(() => {
        setDestinations(destinations.filter(destination => destination.id !== destinationId));
        setIsDialogOpen(false);
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <PageLayout resource="destinations" isOverview showAddButton>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleDelete(deleteItem.id)}
      />

      {destinations.map(({ id, image_alt, image_url, name, keywords }) => (
        <Card
          data={{
            image_alt,
            image_url,
            title: name,
            keywords,
          }}
          key={id}
          onDelete={() => {
            setIsDialogOpen(true);
            setDeleteItem({
              id,
            });
          }}
          editUrl={`destinations/${id}/edit`}
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
  const destinations = await axios
    .get('api/destinations', {
      headers: {
        Cookie: cookie,
        Referer: host,
      },
    })
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      destinations,
    },
  };
};

export default Destinations;
