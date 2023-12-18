import { Card } from '@/components/Card/Card';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';

const Blogs = ({ blogs }) => (
  <PageLayout resource="blogs" isOverview>
    {blogs.map(({ id, image_alt, image_url, title, keywords }) => (
      <Card
        data={{
          image_alt,
          image_url,
          title,
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
  const blogs = await axios
    .get('api/blogs', {
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
      blogs,
    },
  };
};

export default Blogs;
