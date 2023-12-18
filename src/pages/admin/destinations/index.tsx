import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Head from 'next/head';
import Link from 'next/link';

import { Card } from '@/components/Card/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { AppLayout } from '@/layouts/AppLayout';
import { axios } from '@/lib/axios';
import { Destination } from '@/types/destination';

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
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard - Destinations
        </h2>
      }>
      <Head>
        <title>Countryside Kashmir - Destinations</title>
      </Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ConfirmDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onConfirm={() => handleDelete(deleteItem.id)}
          />

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 pb-0">
              <Link href="destinations/create">
                <a className="btn outline p-2 rounded-sm outline-blue-500 text-blue-500 hover:outline-blue-700 hover:text-blue-700">
                  <AddIcon />
                  New Destination
                </a>
              </Link>
            </div>
            <div className="p-6 bg-white border-b border-gray-200 w-full grid grid-cols-3 gap-4">
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
