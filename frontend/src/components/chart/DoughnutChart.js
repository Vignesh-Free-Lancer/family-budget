import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({
  chartCustomClass,
  ChartTitle,
  chartLabels,
  chartDatas,
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = ["January", "Feburary", "March"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "",
        fontSize: "42",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [12, 19, 3],
        backgroundColor: ["#F2CC59", "#BA68C8", "#407BFF"],
        borderColor: ["#F2CC59", "#BA68C8", "#407BFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`budget-app_chart ${chartCustomClass}`}>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;
