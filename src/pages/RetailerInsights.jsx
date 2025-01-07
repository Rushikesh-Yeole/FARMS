import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import RHeader from '../components/RetailerHeader';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const RetailerInsights = () => {
  // Historical data for sales (example data)
  const historicalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Apple Sales',
        data: [120, 150, 200, 180, 210, 220],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Banana Sales',
        data: [80, 90, 120, 140, 160, 180],
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
        fill: false,
      },
      // Add more fruits/vegetables as needed
    ],
  };

  // Predicted sales for upcoming months (example data)
  const predictedData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Apple Sales Prediction',
        data: [230, 240, 250, 270, 290, 310],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Banana Sales Prediction',
        data: [190, 210, 230, 250, 270, 290],
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
        fill: false,
      },
      // Add more fruits/vegetables as needed
    ],
  };

  // Sales data for bar charts (vegetables)
  const vegetableData = {
    labels: ['Carrot', 'Tomato', 'Potato', 'Onion'],
    datasets: [
      {
        label: 'Sales in Q1',
        data: [150, 200, 250, 180],
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sales in Q2',
        data: [180, 220, 240, 210],
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Actionable insights (example data)
  const actionableInsights = [
    { name: 'Apple', predictedSales: 310, suggestion: 'Increase stock for the upcoming months due to high demand.' },
    { name: 'Banana', predictedSales: 290, suggestion: 'Maintain current stock levels as demand is consistent.' },
    { name: 'Carrot', predictedSales: 220, suggestion: 'Prepare for higher demand in Q2 based on seasonal trends.' },
    { name: 'Tomato', predictedSales: 250, suggestion: 'Monitor demand closely due to market fluctuations in Q2.' },
  ];

  return (
    <>
    <RHeader/>
    
    <div className="insights-container">
      <h2>Retailer Insights: Sales and Predictions</h2>
      
      <div className="charts">
        <div className="chart">
          <h3>Historical Sales Data</h3>
          <Line data={historicalData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        
        <div className="chart">
          <h3>Predicted Sales for the Upcoming Months</h3>
          <Line data={predictedData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="chart">
          <h3>Vegetable Sales Comparison</h3>
          <Bar data={vegetableData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="actionable-insights">
        <h1>Actionable Insights</h1>
        <ul>
          {actionableInsights.map((insight, index) => (
            <li key={index}>
              <h4>{insight.name}</h4>
              <p>Predicted Sales: {insight.predictedSales}</p>
              <p><strong>Suggestion:</strong> {insight.suggestion}</p>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .insights-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background:green-100;
        }
        .charts {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .chart {
          flex: 1;
          min-width: 300px;
          height: 300px;
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
           h2 {
          text-align: center;
          margin-bottom: 30px;
          // border:solid 2px;
        }
            h3 {
          margin-bottom: 10px;
          // border: solid 2px ;
        }
        .actionable-insights {
  margin-top: 40px;
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  // border: solid 2px #ddd;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centers text inside the box */
}

ul {
  margin-top: 30px;
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap; /* Allows wrapping for flexible layout */
  gap: 15px; /* Spacing between list items */
}

li {
  border: 1px solid gray; /* Blue border for standout styling */
  padding: 15px;
  border-radius: 6px;
  background-color: #fff; /* White background for card effect */
  flex: 1 1 calc(30% - 20px); /* Flexible width with spacing adjustment */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for card effect */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth hover animation */
}

li:hover {
  transform: translateY(-5px); /* Slight lift effect on hover */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

li h4 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
  font-weight: 600;
}

li p {
  margin: 8px 0 0;
  color: #555;
  font-size: 0.95em;
  line-height: 1.5;
}

      `}</style>
    </div>
    </>
  );
};

export default RetailerInsights;
