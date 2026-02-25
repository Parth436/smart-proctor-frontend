import { Paper, Typography, Chip, Stack } from "@mui/material";

export default function WarningBadges() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        Proctoring Alerts
      </Typography>

      <Stack spacing={1}>
        <Chip label="No Face Detected: 0" color="success" />
        <Chip label="Multiple Faces: 0" color="success" />
        <Chip label="Tab Switches: 1" color="warning" />
        <Chip label="Gaze Away: 2" color="error" />
      </Stack>
    </Paper>
  );
}
