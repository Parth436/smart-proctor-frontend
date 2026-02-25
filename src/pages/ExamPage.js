import React, { useEffect } from "react";
//import WebcamFeed from "../components/proctor/WebcamFeed";
import TabMonitor from "../components/proctor/TabMonitor";

import { Grid, Container, Typography, Paper, Box } from "@mui/material";
import WebcamFeed from "../components/proctor/WebcamFeed";
import WarningBadges from "../components/proctor/WarningBadges";
import RiskChart from "../components/proctor/RiskChart";

export default function ExamPage() {
  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Paper sx={{ p: 2, mt: 2, mb: 3 }}>
        <Typography variant="h5">
          Online Examination – In Progress
        </Typography>
        <Typography color="text.secondary">
          Timer: 58:12 | Current Risk: Low
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Question Panel */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: "70vh" }}>
            <Typography variant="h6" mb={2}>
              Question 1
            </Typography>
            <Typography mb={2}>
              Explain packet switching and compare it with circuit switching.
            </Typography>
            <textarea
              style={{
                width: "100%",
                height: "300px",
                padding: "10px",
                fontSize: "16px",
              }}
            />
          </Paper>
        </Grid>

        {/* Proctor Panel */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <WebcamFeed />
            <WarningBadges />
            <RiskChart />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

