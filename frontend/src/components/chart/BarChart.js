import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

const BarChart = ({
  chartCustomClass,
  ChartTitle,
  chartLabels,
  chartDatas,
  chartDatasetLabel1,
  chartDatasetLabel2,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ["January", "Feburary", "March"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: false,
        text: "",
        fontSize: "42",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: chartDatasetLabel1,
        data: [33, 53, 85],
        fill: true,
        backgroundColor: "#3ac47d",
      },
      {
        label: chartDatasetLabel2,
        data: [39, 25, 35],
        backgroundColor: "#d92550",
      },
    ],
  };
  return (
    <div className={`budget-app_chart ${chartCustomClass}`}>
      <Chart type="bar" options={options} data={data} />
    </div>
  );
};

export default BarChart;
