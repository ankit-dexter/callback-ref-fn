import React, { useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function ChartWithCallbackRef() {
  const [showChart, setShowChart] = useState(true);
  let chartInstance = null;

  const handleRef = (node) => {
    if (node) {
      // 🟢 Mounting: Create chart
      chartInstance = new Chart(node, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "Votes",
              data: [12, 19, 3],
              backgroundColor: ["red", "blue", "yellow"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      console.log("📊 Chart initialized");
    } else {
      // 🔴 Unmounting: Destroy chart
      if (chartInstance) {
        chartInstance.destroy();
        console.log("🧹 Chart destroyed");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setShowChart((prev) => !prev)}>
        {showChart ? "Hide" : "Show"} Chart
      </button>

      <div style={{ marginTop: "2rem" }}>
        {showChart && <canvas ref={handleRef} />}
      </div>
    </div>
  );
}
