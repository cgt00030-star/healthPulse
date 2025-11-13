"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TrendChart({ weeklyTrend }) {
  const labels = weeklyTrend.map((d) => d.day);

  const data = {
    labels,
    datasets: [
      {
        label: "Fever",
        data: weeklyTrend.map((d) => d.fever),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "Cough",
        data: weeklyTrend.map((d) => d.cough),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="h-48">
      <Line data={data} options={options} />
    </div>
  );
}
