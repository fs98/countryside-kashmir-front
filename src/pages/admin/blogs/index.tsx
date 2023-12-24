import { useState } from 'react';

import { Card } from '@/components/Card/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog/ConfirmDialog';
import { PageLayout } from '@/layouts/PageLayout';
import { axios } from '@/lib/axios';
import { Blog } from '@/types/resources';

type BlogsProps = {
  blogs: Blog[];
};

const Blogs = (props: BlogsProps) => {
  const [blogs, setBlogs] = useState<Blog[]>(props.blogs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ id: number | null }>({ id: null });

  const handleDelete = (blogId: number) => {
    axios
      .delete(`/api/blogs/${blogId}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        setIsDialogOpen(false);
      })
      .catch(error => {
        window.alert(error.response.data.message);
      });
  };

  return (
    <PageLayout resource="blogs" isOverview showAddButton>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleDelete(deleteItem.id)}
      />

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
            setIsDialogOpen(true);
            setDeleteItem({ id });
          }}
          editUrl={`blogs/${id}/edit`}
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
