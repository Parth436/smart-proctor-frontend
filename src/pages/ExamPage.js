import React, { useState, useCallback, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  LinearProgress,
  Snackbar,
  Alert,
  Button
} from "@mui/material";

import WebcamFeed from "../components/proctor/WebcamFeed";
import RiskChart from "../components/proctor/RiskChart";
import TabMonitor from "../components/proctor/TabMonitor";

export default function ExamPage() {

  /* ---------------- Proctoring State ---------------- */

  const [tabSwitches, setTabSwitches] = useState(0);
  const [devToolFlags, setDevToolFlags] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [toast, setToast] = useState("");

  /* ---------------- Timer ---------------- */

  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          alert("Time is up! Exam submitted automatically.");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /* ---------------- Questions ---------------- */

  const questions = [
    { id: 1, text: "Explain packet switching and compare it with circuit switching." },
    { id: 2, text: "Define OSI model and explain its layers." },
    { id: 3, text: "What is TCP vs UDP?" },
    { id: 4, text: "Explain DNS working process." }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});

  /* ---------------- Violation Handler ---------------- */

  const handleViolation = useCallback((type, count) => {
    if (type === "TAB_SWITCH" || type === "WINDOW_BLUR") {
      setTabSwitches(count);
      setRiskScore(prev => Math.min(prev + 0.1, 1));
      setToast("Tab switch detected");
    }

    if (type === "DEVTOOLS_OPEN") {
      setDevToolFlags(prev => prev + 1);
      setRiskScore(prev => Math.min(prev + 0.2, 1));
      setToast("Developer tools detected");
    }
  }, []);

  const getRiskColor = () => {
    if (riskScore < 0.3) return "success";
    if (riskScore < 0.7) return "warning";
    return "error";
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Exam Submitted Successfully!");
  };

  return (
    <Box sx={{ background: "#f4f6f9", minHeight: "100vh" }}>

      {/* Header */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight={600}>
                Online Examination – In Progress
              </Typography>
              <Typography color="text.secondary">
                Timer: {formatTime()}
              </Typography>
            </Box>

            <Box width={220}>
              <Chip
                label={`Risk: ${riskScore.toFixed(2)}`}
                color={getRiskColor()}
              />
              <LinearProgress
                variant="determinate"
                value={riskScore * 100}
                color={getRiskColor()}
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 4 }}>

        <TabMonitor onViolation={handleViolation} />

        <Grid container spacing={3}>

          {/* MAIN EXAM SECTION — Bigger */}
          <Grid item xs={12} md={9}>
            <Paper sx={cardStyle}>
              <Typography variant="h6" mb={2}>
                Question {currentQuestion + 1}
              </Typography>

              <Typography mb={3}>
                {questions[currentQuestion].text}
              </Typography>

              <Box
                component="textarea"
                value={answers[currentQuestion] || ""}
                onChange={(e) =>
                  setAnswers({
                    ...answers,
                    [currentQuestion]: e.target.value
                  })
                }
                sx={{
                  width: "100%",
                  height: 300,
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  fontSize: 16,
                  mb: 3
                }}
              />

              <Box display="flex" justifyContent="space-between">

                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() =>
                      setCurrentQuestion(prev =>
                        prev < questions.length - 1 ? prev + 1 : prev
                      )
                    }
                  >
                    Save & Next
                  </Button>
                </Box>

                <Box display="flex" gap={2}>
                  <Button
                    color="warning"
                    variant="outlined"
                    onClick={() =>
                      setMarked({
                        ...marked,
                        [currentQuestion]: true
                      })
                    }
                  >
                    Mark
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        [currentQuestion]: ""
                      })
                    }
                  >
                    Reset
                  </Button>
                </Box>
              </Box>

              <Box mt={4} textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Submit Exam
                </Button>
              </Box>

            </Paper>
          </Grid>

          {/* SMALLER WEBCAM — Secondary */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ ...cardStyle, p: 2 }}>
              <Typography variant="subtitle2" mb={1}>
                Monitoring
              </Typography>

              <Box sx={{ transform: "scale(0.85)", transformOrigin: "top" }}>
                <WebcamFeed />
              </Box>
            </Paper>
          </Grid>

          {/* Risk Chart moved to bottom full width */}
          <Grid item xs={12}>
            <Paper sx={cardStyle}>
              <Typography variant="subtitle1" mb={2}>
                Risk Trend (Background Monitoring)
              </Typography>
              <RiskChart riskScore={riskScore} />
            </Paper>
          </Grid>

        </Grid>
      </Container>

      {/* Toast */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast("")}
      >
        <Alert severity="warning">{toast}</Alert>
      </Snackbar>

    </Box>
  );
}

const cardStyle = {
  p: 3,
  borderRadius: 3,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
};