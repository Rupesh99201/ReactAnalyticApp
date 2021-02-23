import React from "react";
import { Bar } from "react-chartjs-2";

// const state = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgba(255,99,132,0.2)",
//       borderColor: "rgba(255,99,132,1)",
//       borderWidth: 1,
//       hoverBackgroundColor: "rgba(255,99,132,0.4)",
//       hoverBorderColor: "rgba(255,99,132,1)",
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };
// const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       borderWidth: 1,
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

const options = {
  tooltips: {
    mode: "label",
    callbacks: {
      title: function (tooltipItems, data) {
        return data.labels[tooltipItems.index] + " ";
      },
      label: function (tooltipItem, data) {
        return (
          data.datasets[tooltipItem.datasetIndex].label +
          ": " +
          numberWithCommas(tooltipItem.yLabel)
        );
      },
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          callback: function (value) {
            return value.substring(5, value.length);
          },
        },
        gridLines: { display: false },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          callback: function (value) {
            return numberWithCommas(value);
          },
        },
      },
    ],
  }, // scales
  legend: { display: true },
};

const numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const dataPack1 = [
  21000,
  22000,
  26000,
  35000,
  55000,
  55000,
  56000,
  59000,
  60000,
  61000,
  60100,
  62000,
];
const dataPack2 = [
  1000,
  1200,
  1300,
  1400,
  1060,
  2030,
  2070,
  4000,
  4100,
  4020,
  4030,
  4050,
];
const dates = [
  "Mon, May 1",
  "Tue, May 2",
  "Wed, May 3",
  "Thu, May 4",
  "Fri, May 5",
  "Sat, May 6",
  "Sun, May 7",
  "Mon, May 8",
  "Tue, May 9",
  "Wed, May 10",
  "Thu, May 11",
  "Fri, May 12",
];

const data = {
  labels: dates,
  datasets: [
    {
      label: "Bowser",
      data: dataPack1,
      backgroundColor: "rgba(55, 160, 225, 0.7)",
      hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
      hoverBorderWidth: 2,
      hoverBorderColor: "lightgrey",
    },
    {
      label: "Mario",
      data: dataPack2,
      backgroundColor: "rgba(225, 58, 55, 0.7)",
      hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
      hoverBorderWidth: 2,
      hoverBorderColor: "lightgrey",
    },
  ],
};

export default class barchart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chartInstance: null,
    };
  }
  render() {
    return (
      //   <div>
      //     <h2>Horizontal Bar</h2>
      //     <Bar data={(data, options)} />
      //   </div>

      <div style={styles.relative}>
        <div style={styles.pieContainer}>
          <Bar
            data={this.state.loadData}
            options={options}
            ref={(input) => {
              this.chartInstance = input;
            }}
          />{" "}
          <div id="legend2" />
        </div>
      </div>
    );
  }
}

const styles = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "50%",
    left: "20%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};
