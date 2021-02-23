import React from "react";

import jsonData from "./data.json";
import LineComp from "./Line";
import Barchart from "./barchart";
import moment from "moment";
import { chartColors } from "./colors";
import "chart.piecelabel.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartInstance: null,
      data: {
        backgroundColor: chartColors,
        maintainAspectRatio: false,
        id: "toolTipDiv",
        responsive: false,
        startDate: new Date(Object.keys(dateFData).sort()[0]),
        endDate: new Date(
          Object.keys(dateFData).sort()[
            Object.keys(dateFData).sort().length - 1
          ]
        ),
        originStartDate: new Date(Object.keys(dateFData).sort()[0]),
        dataLength: dataObj.xAxisData.length,
        labels: dataObj.xAxisData,
        datasets: [
          {
            borderWidth: 3,
            fill: false,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors,
            label: "Employee Performance",
            data: dataObj.yAxisData,
            labelData: groupData,
            dateFData: dateFData,
            fixedData: originalData,
          },
        ],
      },
    };
  }

  changeFrameData = (array, propertyName) => {
    var returnObj = {
      xAxisData: {},
      yAxisData: {},
    };
    var storeObj = {};
    var storeArray = [];
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      var value = element[propertyName];
      storeArray.push(value);
    }
    storeArray.forEach(function (i) {
      storeObj[i] = (storeObj[i] || 0) + 1;
    });
    returnObj.xAxisData = Object.keys(storeObj);
    returnObj.yAxisData = Object.values(storeObj);
    return returnObj;
  };

  onDateChangeEvenetListener = (startDate, endDate, data) => {
    let fixData = data.datasets[0].fixedData.filter(
      (obj) =>
        new Date(obj.end_date) > startDate && new Date(obj.end_date) < endDate
    );

    let dataObj = this.changeFrameData(fixData, "technician_id");

    data.datasets[0].data = dataObj.yAxisData;
    data.labels = dataObj.xAxisData;
    data.datasets[0].labelData = groupBy(
      "technician_id",
      fixData,
      "groupKeyVal"
    );
    data.datasets[0].dateFData = groupBy("end_date", fixData, "groupKeyVal");
    data.startDate = startDate;
    data.endDate = endDate;
    data.dataLength = dataObj.xAxisData.length;
    return data;
  };
  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.data.startDate;
    endDate = endDate || this.state.data.endDate;

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
      <div>
        <div style={styles.relative}>
          <div style={styles.pieContainer}>
            <div className="lineContainer">
              <div className="startDateDivider">
                <span>From date:</span>
                <DatePicker
                  className="myDatePicker"
                  selected={this.state.data.startDate}
                  onChange={(date) => this.handleChangeStart(date)}
                  selectsStart
                  startDate={this.state.data.startDate}
                  endDate={this.state.data.endDate}
                  minDate={this.state.data.originStartDate}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="toDateDivider">
                <span>To date:</span>
                <DatePicker
                  className="myDatePicker"
                  selected={this.state.data.endDate}
                  onChange={(date) => this.handleChangeEnd(date)}
                  selectsEnd
                  startDate={this.state.data.startDate}
                  minDate={this.state.data.startDate}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div id="legendRight">Count of finished jobs</div>
            {this.state.data.dataLength <= 10 ? (
              <Barchart data={this.state.data} />
            ) : (
              <LineComp data={this.state.data} />
            )}

            <div id="legendBottom">Assignees </div>
          </div>
        </div>
      </div>
    );
  }
}

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

const getChangeFrameData = (array, propertyName) => {
  var returnObj = {
    xAxisData: {},
    yAxisData: {},
  };
  var storeObj = {};
  var storeArray = [];
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var value = element[propertyName];
    storeArray.push(value);
  }
  storeArray.forEach(function (i) {
    storeObj[i] = (storeObj[i] || 0) + 1;
  });
  returnObj.xAxisData = Object.keys(storeObj);
  returnObj.yAxisData = Object.values(storeObj);
  return returnObj;
};

const originalData = JSON.parse(JSON.stringify(jsonData))[0].records;
const dataObj = getChangeFrameData(originalData, "technician_id");
const groupData = groupBy("technician_id", originalData, "groupKeyVal");
const dateFData = groupBy("end_date", originalData, "groupKeyVal");

const styles = {
  pieContainer: {
    width: "40%",
    height: "40%",
    top: "25%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  // relative: {
  //   position: "relative",
  // },
};

export default App;
