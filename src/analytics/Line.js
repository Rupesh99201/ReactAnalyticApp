import React from "react";
import { Line } from "react-chartjs-2";
import { chartColors } from "./colors";
import moment from "moment";
import jsonData from "./data.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

const groupBy = (propertyName, array, groupType) => {
  var groupedElements = {};
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var value = element[propertyName];

    if (propertyName.indexOf("date") > 1) {
      value = moment(value).format("YYYY-MM-DD");
    }
    var group = groupedElements[value];
    if (group === undefined) {
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

const originalData = JSON.parse(JSON.stringify(jsonData))[0].records;
const label = groupBy("technician_id", originalData, "groupKeyVal");
const sourceData = Object.keys(label).map((key) => label[key].length);
const dateFilter = groupBy("end_date", originalData, "groupKeyVal");
//const sourceData = groupBy("end_date", originalData);

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
    for (let i = 0; i < 1; i++) {
      for (let key in tooltipData.value[tooltipData.xLabel][0]) {
        if (
          colHeaderName.indexOf(key) === -1 &&
          tooltipData.value[tooltipData.xLabel][0]
        ) {
          colHeaderName.push(key.toUpperCase());
        }
      }
    }

    var tr = table.insertRow(-1); // TABLE ROW.

    for (let i = 0; i < colHeaderName.length; i++) {
      let th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = colHeaderName[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    let dataLength = tooltipData.value[tooltipData.xLabel].length;
    for (let i = 0; i < dataLength; i++) {
      tr = table.insertRow(-1);

      for (let j = 0; j < colHeaderName.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML =
          tooltipData.value[tooltipData.xLabel][0][
            colHeaderName[j].toLowerCase()
          ];
      }
    }

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

const customBarOptionToolTip = {
  tooltips: {
    enabled: false,
    mode: "index",
    intersect: true,
    custom: customTooltips,
    callbacks: {
      label: (tooltipItem, data) => {
        const itemData = data.datasets[0].labelData;
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
        };
      },
    },
  },

  allDateVal: Object.keys(dateFilter).map((e) => {
    return new Date(e);
  }),
};

export default class LineComp extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: customBarOptionToolTip.allDateVal
        .slice()
        .sort(function (a, b) {
          return new Date(a) - new Date(b);
        })
        .shift(),
      endDate: customBarOptionToolTip.allDateVal
        .slice()
        .sort(function (a, b) {
          return new Date(a) - new Date(b);
        })
        .pop(),
      originStartDate: customBarOptionToolTip.allDateVal
        .slice()
        .sort(function (a, b) {
          return new Date(a) - new Date(b);
        })
        .shift(),
      data: {
        backgroundColor: chartColors,
        labels: Object.keys(label),
        maintainAspectRatio: false,
        id: "toolTipDiv",
        responsive: false,
        datasets: [
          {
            label: "Employee Performance",
            data: sourceData,
            fixedData: originalData,
            labelData: label,
            borderWidth: 3,
            fill: false,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
          },
        ],
      },
    };
  }

  onDateChangeEvenetListener = (startDate, endDate, data) => {
    var fixData = data.datasets[0].fixedData.filter(
      (obj) =>
        new Date(obj.end_date) > startDate && new Date(obj.end_date) < endDate
    );
    var labelData = groupBy("technician_id", fixData, "groupKeyVal");
    var labels = Object.keys(labelData);
    var gData = Object.keys(labelData).map((key) => label[key].length);

    data.datasets[0].data = gData;
    data.datasets[0].labelData = labelData;
    data.labels = labels;
    return data;
  };

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    var mData = this.onDateChangeEvenetListener(
      startDate,
      endDate,
      this.state.data
    );

    this.setState({ startDate, endDate });
    this.setState({ data: mData });
  };

  handleChangeStart = (startDate) => this.handleChange({ startDate });

  handleChangeEnd = (endDate) => this.handleChange({ endDate });

  render() {
    return (
      <div className="lineContainer">
        <span>From date:</span>
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

        <Line data={this.state.data} options={customBarOptionToolTip} />
      </div>
    );
  }
}
