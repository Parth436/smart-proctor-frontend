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

export default function RiskChart({ riskScore }) {
  const [riskData, setRiskData] = useState([0]);

  useEffect(() => {
    setRiskData(prev => [...prev.slice(-10), riskScore]);
  }, [riskScore]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" mb={1}>
        Live Risk Score
      </Typography>

      <Line
        data={{
          labels: riskData.map((_, i) => `T${i + 1}`),
          datasets: [
            {
              label: "Risk Level",
              data: riskData,
              borderColor: "#c62828",
            },
          ],
        }}
        options={{
          animation: false,
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