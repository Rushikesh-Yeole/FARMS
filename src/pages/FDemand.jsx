import FHeader from "../components/FarmerHeader";

export default function TransportDemandListings() {
  const demands = [
    { id: 1, produce: "Wheat", from: "Pune", to: "Mumbai", capacity: "2 tons", date: "12/15/2024", time: "10:00 AM" },
    { id: 2, produce: "Onions", from: "Nasik", to: "Delhi", capacity: "5 tons", date: "12/20/2024", time: "8:00 AM" },
    { id: 3, produce: "Sugarcane", from: "Kolhapur", to: "Bangalore", capacity: "10 tons", date: "12/18/2024", time: "6:00 AM" },
  ];

  return (
    <>
    
    <FHeader/>
   
    <div className="bg-blue-50 min-h-screen py-6 px-4">
      <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">Transport Demands</h1>
      {demands.map(({ id, produce, from, to, capacity, date, time }) => (
        <div key={id} className="bg-white shadow rounded-lg p-4 mb-4 hover:shadow-md transition">
          <h2 className="text-lg font-bold text-blue-800">{produce}</h2>
          <p className="text-sm text-gray-600"><strong>From:</strong> {from} <strong>To:</strong> {to}</p>
          <p className="text-sm text-gray-600"><strong>Capacity:</strong> {capacity}</p>
          <p className="text-sm text-gray-600"><strong>Date:</strong> {date} <strong>Time:</strong> {time}</p>
        </div>
      ))}
    </div>
    </>
  );
}
