/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Typography, Paper, Button, Card, CardContent } from '@mui/material';

export default function Config() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Configuration Settings
      </Typography>
      <Card className="mt-4">
        <CardContent>
          <Typography variant="h6">Preferences</Typography>
          <Typography variant="body2">Set your preferences for the portfolio advisor...</Typography>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
          <Typography variant="h6">Wallet Management</Typography>
          <Button variant="contained" color="primary">
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
          <Typography variant="h6">Staking Options</Typography>
          <Typography variant="body2">Manage your staking options and rewards...</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
