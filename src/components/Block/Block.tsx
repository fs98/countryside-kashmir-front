import { Container, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type BlockProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
};

export const Block: FC<BlockProps> = ({ title, subtitle, children }) => (
  <Container maxWidth="lg" sx={{ py: 6 }}>
    <Typography
      variant="h4"
      color="warning.main"
      fontWeight="bold"
      textAlign="center"
      textTransform="uppercase">
      {title}
    </Typography>

    {subtitle && (
      <Typography
        variant="h6"
        color="text.primary"
        fontWeight="light"
        textAlign="center"
        marginTop={2}>
        {subtitle}
      </Typography>
    )}

    {children}
  </Container>
);
