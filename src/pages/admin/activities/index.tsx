import { Card } from '@/components/Card/Card';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Activity } from '@/types/resources';

type ActivitiesProps = {
  activities: Activity[];
};

const Activities = ({ activities }: ActivitiesProps) => (
  <PageLayout resource="activities" isOverview>
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
          console.log('delete', id);
        }}
        editUrl={`activities/${id}/edit`}
      />
    ))}
  </PageLayout>
);

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
