import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ order }) {
  return (
    <div className="shadow bg-white py-1 rounded-2">
      <Doughnut
        data={{
          labels: ["Payment online with Momo", "Cash on delivery"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                order.filter((order) => order.paymentMethod).length,
                order.filter((order) => !order.paymentMethod).length,
              ],
              backgroundColor: ["deeppink", "cyan"],
              borderColor: ["deeppink", "cyan"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
