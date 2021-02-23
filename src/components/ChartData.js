import React from "react";
import { Line,Pie } from "react-chartjs-2";

const ChartData = ({ data }) => {
  
  console.log(data);

//   return <Line data={data} options={{ responsive: true, height: '600px', width: "600px" }} />;
  return <Pie data={data} options={{ responsive: true, height: '600px', width: "600px" }} />;
};

export default ChartData;