import React from "react";

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
      max: 3600,
      ticks: {
        stepSize: 100,
      },
    },
  },
};

export const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      data: [107, 200, 330, 440, 500, 312, 1000, 3000, 2000, 100, 300, 100],
      backgroundColor: "#235A8F",
      borderRadius: 15,
      borderSkipped: false,
      max: 50000,
    },
  ],
};
