import React from "react";

import { merge } from "lodash";

import { Pie, defaults, Bar } from "react-chartjs-2";
import { chartColors } from "../analytics/colors";
import jsonData from "./data.json";
import LineChart from "./LineChart";
import LineComp from "./Line";
import MChart from "./MChart";
import "chart.piecelabel.js";
import "../App.css";

const startDate = "08/01/2019";
const endDate = "09/01/2019";

const Footer = ({ title }) => <footer>{title}</footer>;

const customTooltips = (tooltip) => {
  // tooltip will be false if tooltip is not visible or should be hidden
  if (!tooltip) {
    return;
  }

  // Otherwise, tooltip will be an object with all tooltip properties like:
  tooltip.backgroundColor = "#FFF";
  tooltip.mode = "index";
  tooltip.intersect = true;
  tooltip.yPadding = 10;
  tooltip.xPadding = 10;
  tooltip.caretSize = 4;
  tooltip.bodyFontColor = "#5A5A5A";
  tooltip.borderColor = "#CECED0";
  tooltip.borderWidth = 0.05;
  tooltip.cornerRadius = 0;
  tooltip.displayColors = false;
  tooltip.displayColors = false;

  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }
  const getBody = (bodyItem) => bodyItem.lines;

  // Set custom tooltip
  if (tooltip.body) {
    const bodyLines = tooltip.body.map(getBody);
    const tooltipData = bodyLines[0][0];

    // Custom tooltip requires an id for proper positioning
    if (!tooltipData.id) {
      return;
    }
    /// new Code Section
    var table = document.createElement("table");
    // table.setAttribute("id", "tableId");
    var colHeaderName = [];
    for (var i = 0; i < 1; i++) {
      for (var key in tooltipData.value[i]) {
        if (colHeaderName.indexOf(key) === -1 && tooltipData.value[i][key]) {
          colHeaderName.push(key.toUpperCase());
        }
      }
    }

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < colHeaderName.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = colHeaderName[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < tooltipData.value.length; i++) {
      tr = table.insertRow(-1);

      for (var j = 0; j < colHeaderName.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML =
          tooltipData.value[i][colHeaderName[j].toLowerCase()];
      }
    }

    // // Create inner html
    // let innerHtml = "<thead>";
    // const picture = tooltipData.pictureUrl;
    // const tooltipTitle = `<td class="tooltip-title">${
    //   tooltipData.label(tooltipData.tooltipItem, tooltipData.data)
    //     ? tooltipData.label(tooltipData.tooltipItem, tooltipData.data)
    //     : titleLines[0]
    // }</td>`;
    // const tooltipValue = `<td class="tooltip-value">${table}${
    //   tooltipData.percent(tooltipData.tooltipItem, tooltipData.data) ? "%" : ""
    // }</td>`;
    // if (picture) {
    //   innerHtml += `<tr><th colspan="2"><img class='tooltip-img img-responsive' src="${picture}" /></th></tr>`;
    //   innerHtml += "</thead><tbody><tr>";
    //   innerHtml += tooltipValue + tooltipTitle;
    // } else {
    //   innerHtml += tooltipTitle;
    //   innerHtml += "</thead><tbody><tr>";
    //   innerHtml += tooltipValue;
    // }
    // innerHtml += "</tr></tbody>";

    // Set inner html to tooltip
    const tableRoot = tooltipEl.querySelector("table");
    // tableRoot.innerHTML = innerHtml;
    tableRoot.setAttribute("id", tooltipData.id);
    tableRoot.innerHTML = table.innerHTML;
    // Calculate position
    // const positionY = chartElement.top + tooltip.yPadding;
    // const positionX = chartElement.left + tooltip.xPadding;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = 745.242 + "px";
    tooltipEl.style.top = 8.257 + "px";
  }
};

const customOptionToolTip = {
  tooltips: {
    enabled: false,
    custom: customTooltips,
    callbacks: {
      label: (tooltipItem, data) => {
        var index =
          tooltipItem[0] && tooltipItem[0].index
            ? tooltipItem[0].index
            : tooltipItem.index;

        const itemData =
          data.datasets[0].groupByData[
            data.labels[index].replace(" ", "_").toLocaleLowerCase()
          ];
        // Return custom data to tooltip, these will be available inside the tooltip.body
        return {
          id: data.id,
          // pictureUrl: itemData.pictureUrl,
          label: function (tooltipItem, data) {
            return data.labels[tooltipItem.index];
          },
          value: itemData,
          xLabel: tooltipItem.xLabel,
          data: data,
          tooltipItem: tooltipItem,
          percent: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );
            return currentValue + " (" + percentage + "%)";
          },
        };
      },
    },
  },
  title: {
    display: false,
    text: "Jobs Level",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "bottom",
  },
  pieceLabel: {
    render: "value",
  },
};

const customBarOptionToolTip = {
  tooltips: {
    enabled: false,
    custom: customTooltips,
    callbacks: {
      label: (tooltipItem, data) => {
        var index =
          tooltipItem[0] && tooltipItem[0].index
            ? tooltipItem[0].index
            : tooltipItem.index;

        const itemData =
          data.datasets[0].groupByData[
            data.labels[index].replace(" ", "_").toLocaleLowerCase()
          ];
        // Return custom data to tooltip, these will be available inside the tooltip.body
        return {
          id: data.id,
          // pictureUrl: itemData.pictureUrl,
          label: function (tooltipItem, data) {
            return data.labels[tooltipItem.index];
          },
          value: itemData,
          xLabel: tooltipItem.xLabel,
          data: data,
          tooltipItem: tooltipItem,
          percent: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );
            return currentValue + " (" + percentage + "%)";
          },
        };
      },
    },
  },
  title: {
    display: false,
    text: "Jobs Level",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "bottom",
  },
  pieceLabel: {
    render: "value",
  },
};

const pieData = {
  maintainAspectRatio: false,
  responsive: false,
  labels: ["usa", "europe", "africa"],
  datasets: [
    {
      data: [200, 150, 20, 10],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors,
    },
  ],
};

const groupBy = (propertyName, array, groupType) => {
  var groupedElements = {};
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var value = element[propertyName];

    var group = groupedElements[value];
    if (group == undefined) {
      group = [element];
      groupedElements[value] = group;
    } else {
      group.push(element);
    }
  }
  if (groupType === "groupKeyVal") {
    return groupedElements;
  } else {
    Object.keys(groupedElements).forEach(function (key) {
      result.push(groupedElements[key].length);
    });
    return result;
  }
};

class App extends React.Component {
  constructor() {
    super();

    // this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      records: JSON.parse(JSON.stringify(jsonData))[0].records,
      chartInstance: null,
      loadData: {
        maintainAspectRatio: false,
        id: "toolTipDiv",
        responsive: false,
        labels: JSON.parse(JSON.stringify(jsonData))[0].labels,
        fixedData: JSON.parse(JSON.stringify(jsonData))[0].records
          ? JSON.parse(JSON.stringify(jsonData))[0].records
          : [],
        datasets: [
          {
            label: "Jobs Level",
            data: groupBy(
              "status",
              JSON.parse(JSON.stringify(jsonData))[0].records
                ? JSON.parse(JSON.stringify(jsonData))[0].records
                : []
            ),
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
            groupByData: groupBy(
              "status",
              JSON.parse(JSON.stringify(jsonData))[0].records
                ? JSON.parse(JSON.stringify(jsonData))[0].records
                : [],
              "groupKeyVal"
            ),
          },
        ],
      },
      loadBarData: {
        maintainAspectRatio: false,
        id: "toolTipDiv1",
        responsive: false,
        labels: Object.keys(
          groupBy(
            "technician_id",
            JSON.parse(JSON.stringify(jsonData))[0].records
              ? JSON.parse(JSON.stringify(jsonData))[0].records
              : [],
            "groupKeyVal"
          )
        ),
        fixedData: JSON.parse(JSON.stringify(jsonData))[0].records
          ? JSON.parse(JSON.stringify(jsonData))[0].records
          : [],
        datasets: [
          {
            label: "Jobs Level",
            data: groupBy(
              "technician_id",
              JSON.parse(JSON.stringify(jsonData))[0].records
                ? JSON.parse(JSON.stringify(jsonData))[0].records
                : []
            ),
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
            groupByData: groupBy(
              "technician_id",
              JSON.parse(JSON.stringify(jsonData))[0].records
                ? JSON.parse(JSON.stringify(jsonData))[0].records
                : [],
              "groupKeyVal"
            ),
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="App">
        {/* <div style={styles1.relative}>
          <div style={styles1.pieContainer}>
            <Pie
              data={pieData}
              options={pieOptions}
              ref={(input) => {
                this.chartInstance = input;
              }}
            />
          </div>
          <div id="legend1" />
        </div> */}

        <div style={styles2.relative}>
          <div style={styles2.pieContainer}>
            <Bar
              data={this.state.loadBarData}
              options={customBarOptionToolTip}
              ref={(input) => {
                this.chartInstance = input;
              }}
            />{" "}
            <div id="legend2" />
          </div>
        </div>

        <div style={styles3.relative}>
          <div style={styles3.pieContainer}>
            <Pie
              data={this.state.loadData}
              options={customOptionToolTip}
              ref={(input) => {
                this.chartInstance = input;
              }}
            />
            <div id="legend3" />
          </div>
        </div>
        <div style={styles1.relative}>
          <div style={styles1.pieContainer}>
            <LineChart />
            <div id="legend3" />
          </div>
        </div>
        <div style={styles4.relative}>
          <div style={styles4.pieContainer}>
            <LineComp />
            <div id="legend4" />
          </div>
        </div>

        {/* <div style={styles5.relative}>
          <div style={styles5.pieContainer}>
            <MChart />
            <div id="legend4" />
          </div>
        </div> */}
      </div>
    );
  }
}

merge(defaults, {
  global: {
    tooltips: {
      enabled: false,
      custom: customTooltips,
      callbacks: {
        label: (tooltipItem, data) => {
          var index =
            tooltipItem[0] && tooltipItem[0].index
              ? tooltipItem[0].index
              : tooltipItem.index;
          // const itemData = data.datasets[index];
          const itemData =
            data.datasets[0].groupByData[
              data.labels[index].replace(" ", "_").toLocaleLowerCase()
            ];

          // Return custom data to tooltip, these will be available inside the tooltip.body
          return {
            id: data.id,
            pictureUrl: itemData.pictureUrl,
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            },
            value: tooltipItem.yLabel,
            xLabel: tooltipItem.xLabel,
            percent: data.percent,
          };
        },
      },
    },
  },
});

const styles1 = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "75%",
    left: "30%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

const styles2 = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "30%",
    left: "30%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

const styles3 = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "30%",
    left: "75%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

const styles4 = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "75%",
    left: "75%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

const styles5 = {
  pieContainer: {
    width: "50%",
    height: "50%",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

export default App;
