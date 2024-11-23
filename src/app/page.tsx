import { Container, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <Container className="text-center">
      <Typography variant="h3" gutterBottom>
        Welcome to CryptoMinds
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your AI-powered multi-chain portfolio advisor
      </Typography>
      <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
      <div className="mt-4">
        <Button variant="contained" color="primary" href="/portfolio">
          View Portfolio
        </Button>
        <Button variant="outlined" color="secondary" href="/configs" className="ml-4">
          Configure Settings
        </Button>
      </div>
    </Container>
  );
}
