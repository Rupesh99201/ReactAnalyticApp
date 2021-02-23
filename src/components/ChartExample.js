import React, { useState, useEffect } from "react";
import axios from "axios";

// import Chart from "./ChartData";
import PieChart from '../react-analytics/PieChart';

const ChartExample = () => {
  const [chart, setChart] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://www.json-generator.com/api/json/get/coXIyroYAy?indent=2`
      );

      setChart({
        labels: [Object.keys(res.data[0].labels)],
        datasets: [
          {
            label: "Covid-19",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(res.data[0].data)
          }
        ]
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <PieChart data={chart} />
    </div>
  );
};

export default ChartExample;


