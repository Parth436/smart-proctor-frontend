import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function RiskChart() {
  const [riskData, setRiskData] = useState([0.02, 0.04, 0.06]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskData((prev) => [
        ...prev.slice(1),
        Math.min(prev[prev.length - 1] + Math.random() * 0.02, 1),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        Live Risk Score
      </Typography>

      <Line
        data={{
          labels: ["T1", "T2", "T3"],
          datasets: [
            {
              label: "Risk Level",
              data: riskData,
              borderColor: "#c62828",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              min: 0,
              max: 1,
            },
          },
        }}
      />
    </Paper>
  );
}
