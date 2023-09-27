import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const AnalyticsPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from your API to get the device notification counts
    axios.get("http://localhost:8080/api/notifications/analytics")
      .then((response) => {
        const devices = response.data.devices;
        const notificationCounts = response.data.notificationCounts;

        // Prepare data for the chart
        const chartData = {
          labels: devices,
          datasets: [
            {
              label: "Notification Count",
              data: notificationCounts,
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Customize colors as needed
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Most Collected Notification Devices</h1>
      <div style={{ height: "400px", width: "600px" }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
