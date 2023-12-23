import { useState } from 'react';

import { Card } from '@/components/Card/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Activity } from '@/types/resources';

type ActivitiesProps = {
  activities: Activity[];
};

const Activities = (props: ActivitiesProps) => {
  const [activities, setActivities] = useState<Activity[]>(props.activities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | null }>({ id: null });

  const handleDelete = (activityId: number) => {
    axios
      .delete(`/api/activities/${activityId}`)
      .then(() => {
        setActivities(activities.filter(activity => activity.id !== activityId));
        setIsDialogOpen(false);
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <PageLayout resource="activities" isOverview showAddButton>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleDelete(deleteItem.id)}
      />

      {activities.map(({ id, image_alt, image_url, name, keywords }) => (
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
            setDeleteItem({ id });
          }}
          editUrl={`activities/${id}/edit`}
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
  const activities = await axios
    .get('api/activities', {
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
      activities,
    },
  };
};

export default Activities;
