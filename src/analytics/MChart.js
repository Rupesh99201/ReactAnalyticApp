import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Line } from "react-chartjs-2";

let lineData;

const lineDataSpend = {
  labels: ["March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      label: "Spend - Account 1",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "green",
      borderColor: "green",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "green",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Spend - Account 2",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "blue",
      borderColor: "blue",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "blue",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [25, 5, 8, 53, 96, 35, 20],
    },
  ],
};

const lineDataRev = {
  labels: ["March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      label: "Revenue - Account 1",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "red",
      borderColor: "red",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "red",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [27, 9, 37, 31, 102, 42, 19],
    },
    {
      label: "Revenue - Account 2",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "yellow",
      borderColor: "yellow",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "yellow",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [1, 29, 4, 112, 26, 49, 81],
    },
  ],
};

lineData = {
  labels: ["March", "April", "May", "June", "July", "August", "September"],
  datasets: [
    {
      label: "Spend - Account 1",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "green",
      borderColor: "green",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "green",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Spend - Account 2",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "blue",
      borderColor: "blue",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "blue",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [25, 5, 8, 53, 96, 35, 20],
    },
  ],
}; //init the graph data to 'Spend'

const lineOptions = {
  title: {
    display: true,
    text: "Account 1 vs Account 2",
  },
  tooltips: {
    enabled: true,
    callbacks: {
      label: function (value, data) {
        console.log("data", data);
        const currentLabel = data.datasets[value.datasetIndex].label;
        return currentLabel + ": " + "$" + value.yLabel;
      },
    },
  },
  legend: {
    display: true,
  },
  maintainAspectRatio: true,
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return "$" + parseFloat(value.toFixed(2));
          },
        },
        stacked: false,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export default class MChart extends Component {
  constructor(props) {
    super(props);
    this.changeMetric = this.changeMetric.bind(this);

    this.state = {
      selectedMetric: "Spend",
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  changeMetric(event) {
    this.setState({
      selectedMetric: event.target.value,
    });

    switch (event.target.value) {
      case "Spend":
        lineData = lineDataSpend;
        break;
      case "Revenue":
        lineData = lineDataRev;
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <select onChange={this.changeMetric} value={this.state.selectedMetric}>
          <option value="Spend">Spend</option>
          <option value="Revenue">Revenue</option>
        </select>

        <div className="row">
          <div className="col-xl-10">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" />
              </div>
              <div className="card-block">
                <DatePicker
                  className="myDatePicker"
                  selected={this.state.startDate}
                  onChange={(date) => this.handleChangeStart(date)}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  minDate={new Date(this.state.originStartDate)}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
                <span>To date:</span>
                <DatePicker
                  className="myDatePicker"
                  selected={this.state.endDate}
                  onChange={(date) => this.handleChangeEnd(date)}
                  selectsEnd
                  startDate={this.state.startDate}
                  minDate={new Date(this.state.startDate)}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
