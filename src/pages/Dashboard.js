import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider
} from "@mui/material";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Candidates",
      value: "1,280",
      change: "+12% vs last month"
    },
    {
      title: "Exams Completed",
      value: "1,054",
      change: "+8% vs last month"
    },
    {
      title: "Violations Detected",
      value: "142",
      change: "+3% vs last month"
    },
    {
      title: "Average Risk Score",
      value: "0.18",
      change: "-2% vs last month"
    }
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f5f6fa" }}>

      {/* SIDEBAR */}
      <Box
        sx={{
          width: 240,
          background: "white",
          borderRight: "1px solid #e0e0e0",
          p: 3,
          position: "relative"
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          ProctorVerify
        </Typography>

        <SidebarItem label="Dashboard" active />
        <SidebarItem label="Candidates" />
        <SidebarItem label="Exam Records" />
        <SidebarItem label="Reports" />
        <SidebarItem label="Settings" />

        <Box sx={{ position: "absolute", bottom: 20 }}>
          <SidebarItem label="Logout" />
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, p: 5 }}>

        {/* HEADER WITH START BUTTON */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="600">
              Candidate Dashboard
            </Typography>

            <Typography color="text.secondary">
              Overview of your exam performance and proctoring status
            </Typography>
          </Box>

          <Button
            onClick={() => (window.location.href = "/exam")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              background: "linear-gradient(135deg, #1a237e, #3949ab)",
              color: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              "&:hover": {
                background: "linear-gradient(135deg, #0d133f, #1a237e)"
              }
            }}
          >
            Start Exam
          </Button>
        </Box>

        {/* KPI CARDS */}
        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box sx={cardStyle}>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>

                <Typography variant="h5" fontWeight="bold" mt={1}>
                  {item.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "#2ecc71" }}
                >
                  {item.change}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ACTIVITY SECTION */}
        <Box sx={{ ...cardStyle, mt: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3
            }}
          >
            <Typography variant="h6">
              Monthly Proctoring Activity
            </Typography>

            <Button variant="outlined" size="small">
              View Report
            </Button>
          </Box>

          <Divider />

          <Box
            sx={{
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999"
            }}
          >
            Chart Placeholder
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------------- Sidebar Item ---------------- */

function SidebarItem({ label, active }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        mb: 1,
        background: active ? "#eef2ff" : "transparent",
        color: active ? "#3949ab" : "#555",
        fontWeight: active ? 600 : 400,
        "&:hover": {
          background: "#f0f0f0"
        }
      }}
    >
      {label}
    </Box>
  );
}

/* ---------------- Card Style ---------------- */

const cardStyle = {
  background: "white",
  p: 3,
  borderRadius: 3,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
};