import { Card } from '@/components/Card/Card';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Package } from '@/types/resources';

type PackagesProps = {
  packages: Package[];
};

const Packages = ({ packages }: PackagesProps) => (
  <PageLayout resource="packages" isOverview showAddButton>
    {packages.map(item => (
      <Card
        data={{ ...item, title: item.name }}
        key={item.id}
        onDelete={() => {
          console.log('delete', item.id);
        }}
        editUrl={`packages/${item.id}/edit`}
      />
    ))}
  </PageLayout>
);

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
