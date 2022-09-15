import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { BlogsProps } from '@/pages';
import Block from '@/components/Block/Block';

type BlogsPreviewProps = {
  blogs: BlogsProps[];
};

const BlogsPreview = ({ blogs }: BlogsPreviewProps): JSX.Element => {
  const [mainPost, ...sidePosts] = blogs;

  return (
    <Block title="Travel Blogs">
      <Grid marginTop={6} container rowSpacing={5} spacing={5}>
        <Grid item xs={12} md={4} container>
          <img
            src="https://countrysidekashmir.com/img/countryside_kashmir_man_backpack.jpg"
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={4} container>
          <Typography variant="h6" color="warning.main" fontWeight="bold" textAlign="left">
            {mainPost.title}
          </Typography>

          {mainPost.content.blocks.slice(0, 3).map((block, i) => (
            <Typography
              key={i}
              variant="body1"
              fontWeight="light"
              marginTop={2}
              textAlign="justify">
              {block.data.text}
            </Typography>
          ))}

          <Button
            variant="outlined"
            color="warning"
            sx={{
              marginTop: 2,
              py: 2,
              textTransform: 'none',
            }}>
            Read more...
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          {sidePosts.map((blog, i) => (
            <Box key={i} display="flex" marginBottom={2}>
              <img width={150} src={blog.image_url} alt="" />
              <Link
                color="warning.main"
                fontWeight="bold"
                marginLeft={2}
                textAlign="left"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}>
                {blog.title}
              </Link>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Block>
  );
};

export default BlogsPreview;
