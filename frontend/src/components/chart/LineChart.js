import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

const LineChart = ({
  chartCustomClass,
  chartLabels,
  chartDatas,
  chartDatasetLabel1,
  chartDatasetLabel2,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        borderColor: "rgb(46,139,87)",
        backgroundColor: "rgba(46,139,87, 0.5)",
      },
      {
        label: chartDatasetLabel2,
        data: [39, 25, 35],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={`budget-app_chart ${chartCustomClass}`}>
      <Chart type="line" options={options} data={data} />
    </div>
  );
};

export default LineChart;
