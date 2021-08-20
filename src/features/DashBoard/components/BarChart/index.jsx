import PropTypes from "prop-types";
import React from "react";
import { Line } from "react-chartjs-2";
import "./barchart.scss";

BarChart.propTypes = {
  monthlyIncome: PropTypes.array.isRequired,
};

function BarChart(props) {
  const { monthlyIncome } = props;
  return (
    <div className="BarChart shadow">
      <Line
        width={1000}
        height={150}
        options={{
          maintainAspectRadio: false,

          animations: {
            tension: {
              duration: 2000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },

          scales: {
            y: {
              // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 10000,
            },
          },

          plugins: {
            legend: {
              display: true,
              labels: {
                boxWidth: 40,
                boxHeight: 1,
                color: "black",
              },
            },
          },
        }}
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],

          datasets: [
            {
              label: "Monthly Income",
              data: monthlyIncome,
              borderColor: [
                "black",
                "red",
                "green",
                "blue",
                "yellow",
                "cyan",
                "deeppink",
                "orange",
                "pink",
                "purple",
                "brown",
                "Lavender",
              ],

              borderWidth: 4,
            },
          ],
        }}
      />
    </div>
  );
}

export default BarChart;
