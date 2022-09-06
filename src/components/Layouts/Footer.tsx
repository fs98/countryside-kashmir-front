import { Container } from '@mui/material';

export const Footer = () => {
  return (
    <footer>
      <Container
        maxWidth="xl"
        sx={{ bgcolor: 'success.main', color: 'white', py: 2, textAlign: 'center' }}>
        <div>All rights reserved &copy; Countryside Kashmir Tour and Travel</div>
      </Container>
    </footer>
  );
};
