/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function HistoryDiagramme(props) {
  function formatChartData(data) {
    const wantedData = data.timeline ? data.timeline : data;
    const dataCategories = [];
    const formatedData = [];

    for (const [key, value] of Object.entries(wantedData)) {
      dataCategories.push(value);
    }

    for (const category of dataCategories) {
      const dataPart = [];
      let lastValue = 0;
      let index = 0;
      for (const [key, value] of Object.entries(category)) {
        dataPart.push({
          x: key,
          y: index === 0 ? 0 : value - lastValue,
        });
        index++;
        lastValue = value;
      }
      formatedData.push(dataPart);
    }

    return formatedData;
  }

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(formatChartData(props.historyInfoToDisplay));
  }, [props.historyInfoToDisplay]);

  return (
    <div className="chart-container">
      <h1>
        {props.selectedCountry} {props.selected} history
      </h1>
      <Line
        options={options}
        data={{
          datasets: [
            {
              backgroundColor:
                props.selected === "cases"
                  ? "rgba(255, 0, 0, .5)"
                  : props.selected === "recovered"
                  ? "#adff2f90"
                  : "lightgray",
              borderColor:
                props.selected === "cases"
                  ? "red"
                  : props.selected === "recovered"
                  ? "#adff2f"
                  : "gray",
              data:
                props.selected === "cases"
                  ? chartData[0]
                  : props.selected === "recovered"
                  ? chartData[2]
                  : chartData[1],
            },
          ],
        }}
      />
    </div>
  );
}

export default HistoryDiagramme;
