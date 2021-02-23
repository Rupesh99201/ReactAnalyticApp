import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

export default class barchart extends React.Component {
  render() {
    console.log(this.props);
    return <Bar data={this.props.data} options={customBarOptionToolTip} />;
  }
}

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
};
