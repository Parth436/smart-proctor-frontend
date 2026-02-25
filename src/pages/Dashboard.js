import React from "react";


import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";

export default function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" mt={4} mb={3}>
        Candidate Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Exam Status</Typography>
            <Typography color="text.secondary">
              Scheduled
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Risk Score</Typography>
            <Typography color="success.main">
              0.02 (Low Risk)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => (window.location.href = "/exam")}
      >
        Start Exam
      </Button>
    </Container>
  );
}

