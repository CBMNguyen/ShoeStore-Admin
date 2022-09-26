import PropTypes from "prop-types";
import { Bar, Line } from "react-chartjs-2";
import { Button, Input } from "reactstrap";
import "./linechart.scss";

LineChart.propTypes = {
  monthlyIncome: PropTypes.array.isRequired,
};
function LineChart({ data, filter, setFilter }) {
  return (
    <div className="LineChart shadow rounded-2 pt-3">
      <div className="LineChart__filter">
        <Input
          onChange={(e) =>
            setFilter({ ...filter, year: Number(e.target.value) })
          }
          type="select"
          size="sm"
          className="me-2"
        >
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </Input>
        <Input
          onChange={(e) =>
            setFilter({ ...filter, type: Number(e.target.value) })
          }
          type="select"
          size="sm"
          className="me-2"
        >
          <option value={0}>Monthly</option>
          <option value={1}>Quarterly</option>
        </Input>
        <Input
          onChange={(e) =>
            setFilter({ ...filter, chartType: Number(e.target.value) })
          }
          type="select"
          size="sm"
          className="me-2"
        >
          <option value={0}>Line</option>
          <option value={1}>Bar</option>
        </Input>

        <Button color="info" size="sm" className="text-white">
          filter
        </Button>
      </div>
      {filter.chartType === 0 && (
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
                max: 300,
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
            labels: data[2],

            datasets: [
              {
                label: "Revenue Statistics",
                data: data[0],
                fill: true,
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
              {
                label: "Income Statistics",
                data: data[1],
                fill: true,
                borderWidth: 4,
                borderColor: "green",
              },
            ],
          }}
        />
      )}
      {filter.chartType === 1 && (
        <Bar
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
                max: 300,
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
            labels: data[2],

            datasets: [
              {
                label: "Revenue Statistics",
                data: data[0],
                fill: true,
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
              {
                label: "Income Statistics",
                data: data[1],
                fill: true,
                borderWidth: 4,
                borderColor: "green",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineChart;
