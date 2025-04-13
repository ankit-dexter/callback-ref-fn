"use client"

import React, { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function ChartWithUseRef() {
  const [showChart, setShowChart] = useState(true);
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // to hold the chart instance

  useEffect(() => {
    if (canvasRef.current && !chartRef.current) {
      // 🟢 Try to initialize chart
      chartRef.current = new Chart(canvasRef.current, {
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
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
        console.log("🧹 Chart destroyed");
      }
    };
  }, [showChart]);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setShowChart((prev) => !prev)}>
        {showChart ? "Hide" : "Show"} Chart
      </button>

      <div style={{ marginTop: "2rem" }}>
        {showChart && <canvas ref={canvasRef} />}
      </div>
    </div>
  );
}
