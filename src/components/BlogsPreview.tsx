import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { BlogsProps } from '@/pages';

type BlogsPreviewProps = {
  blogs: BlogsProps[];
};

const BlogsPreview = ({ blogs }: BlogsPreviewProps): JSX.Element => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ color: 'orange', fontWeight: '600', textTransform: 'uppercase' }}>
        Travel Blogs
      </Typography>

      <Grid marginTop={6} container rowSpacing={5} spacing={5}>
        <Grid item xs={12} md={4} container>
          <img
            src="https://countrysidekashmir.com/img/countryside_kashmir_man_backpack.jpg"
            alt=""
          />
        </Grid>
        <Grid item xs={12} md={4} container>
          <Typography
            variant="h6"
            sx={{
              color: 'orange',
              fontWeight: '600',
              textAlign: 'left',
            }}>
            {blogs[0].title}
          </Typography>
          {blogs[0].content.blocks.slice(0, 3).map((block, i) => {
            return (
              <Typography
                key={i}
                variant="body1"
                sx={{ fontWeight: 'light', textAlign: 'justify', marginTop: 2 }}>
                {block.data.text}
              </Typography>
            );
          })}
          <Button
            variant="contained"
            color="success"
            sx={{
              backgroundColor: 'orange !important',
              marginTop: 2,
              py: 2,
              textTransform: 'none',
            }}>
            Read more...
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          {blogs.slice(1).map(blog => {
            return (
              <Box display="flex" marginBottom={2}>
                <img width={150} src={blog.image_url} alt="" />
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'left',
                    marginLeft: 2,
                    color: 'orange',
                    fontWeight: 'bold',
                  }}>
                  {blog.title}
                </Link>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogsPreview;
