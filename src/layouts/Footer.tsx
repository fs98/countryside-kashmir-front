import { Box } from '@mui/material';

export const Footer = () => {
  return (
    <footer>
      <Box
        maxWidth="xl"
        color="common.white"
        bgcolor="success.main"
        paddingY={2}
        textAlign="center">
        <div>All rights reserved &copy; Countryside Kashmir Tour and Travel</div>
      </Box>
    </footer>
  );
};
