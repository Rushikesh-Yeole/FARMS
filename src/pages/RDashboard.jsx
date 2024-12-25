// Dashboard.jsx
import React from "react";

const demands = [
  { id: 1, name: "Nyanya Chungu", quantity: "100 Kg", date: "2024-10-20", location: "Iringa", status: "Pending" },
  { id: 2, name: "Maharage", quantity: "250 Kg", date: "2024-10-25", location: "Mbeya", status: "Matched" },
];

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">My Demands</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Commodity</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{demand.name}</td>
                <td className="py-2 px-4">{demand.quantity}</td>
                <td className="py-2 px-4">{demand.date}</td>
                <td className="py-2 px-4">{demand.location}</td>
                <td className="py-2 px-4 text-green-600 font-semibold">{demand.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
