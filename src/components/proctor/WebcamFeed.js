import { useEffect, useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function WebcamFeed() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  }, []);

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="subtitle1" mb={1}>
        Live Proctoring Feed
      </Typography>

      <Box
        sx={{
          border: "2px solid #1a237e",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          width="100%"
          height="220"
          style={{ objectFit: "cover" }}
        />
      </Box>
    </Paper>
  );
}
