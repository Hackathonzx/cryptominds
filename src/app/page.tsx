/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Typography, Button, Card, CardContent } from '@mui/material';
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
      <div className="mt-4">
        <Button variant="contained" color="primary" href="/portfolio">
          View Portfolio
        </Button>
        <Button variant="outlined" color="secondary" href="/configs" className="ml-4">
          Configure Settings
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent>
          <Typography variant="h6">About CryptoMinds</Typography>
          <Typography variant="body2">
            CryptoMinds is a cutting-edge AI-driven portfolio advisor built on the Cronos blockchain. It leverages the Crypto.com AI Agent SDK and integrates with Cronos APIs, offering dynamic portfolio management based on real-time data and user preferences.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
