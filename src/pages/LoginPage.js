import React from "react";

import { Container, Paper, Typography, Button, Box } from "@mui/material";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Smart Proctoring System
          </Typography>
          <Typography color="text.secondary" mb={3}>
            AI-based Secure Online Examination Platform
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Login (Demo)
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
