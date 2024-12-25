import React, { useState } from "react";

const initialData = [
  { id: 1, from: "City A", to: "City B", quantity: 500, date: "2024-12-20", time: "14:30", farmer: { name: "John Doe", contact: "123-456-7890" } },
  { id: 2, from: "City A", to: "City Y", quantity: 300, date: "2024-12-21", time: "09:45", farmer: { name: "Alice Smith", contact: "987-654-3210" } },
  { id: 3, from: "City M", to: "City N", quantity: 250, date: "2024-12-22", time: "11:15", farmer: { name: "Bob Johnson", contact: "555-666-7777" } },
];

export default function Home() {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [cards, setCards] = useState(initialData);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleApply = () => {
    const filtered = initialData.filter((card) => {
      const matchesFrom = fromInput === "" || card.from.toLowerCase() === fromInput.toLowerCase();
      const matchesTo = toInput === "" || card.to.toLowerCase() === toInput.toLowerCase();
      const matchesDate = dateInput === "" || card.date === dateInput;
      return matchesFrom && matchesTo && matchesDate;
    });

    setCards(filtered);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="bg-green-100 min-h-screen p-4">
      {/* Row with Input Fields */}
      <div className="bg-green-200 p-4 shadow-md rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="from" className="text-green-700 font-medium">
              From:
            </label>
            <input
              type="text"
              id="from"
              placeholder="Enter origin"
              value={fromInput}
              onChange={(e) => setFromInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="to" className="text-green-700 font-medium">
              To:
            </label>
            <input
              type="text"
              id="to"
              placeholder="Enter destination"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="date" className="text-green-700 font-medium">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          <button
            onClick={handleApply}
            className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-8 flex flex-col items-center gap-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="bg-white shadow-md rounded-lg w-full max-w-md p-4 flex justify-between items-center cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-green-700 font-medium">From: {card.from}</p>
                <p className="text-green-700 font-medium">To: {card.to}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-700">Quantity: {card.quantity}kg</p>
                <p className="text-gray-700">Date: {card.date}</p>
                <p className="text-gray-700">Time: {card.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 font-medium">No matching data found</p>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-md w-3/4 max-w-lg p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-700 font-bold text-lg"
            >
              &times;
            </button>
            <div className="flex items-center">
              {/* Circular Image */}
              <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Farmer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Farmer Details */}
              <div className="ml-4">
                <h3 className="text-green-700 font-bold text-lg">Farmer Details</h3>
                <p className="text-gray-700">Name: {selectedCard.farmer.name}</p>
                <p className="text-gray-700">Contact: {selectedCard.farmer.contact}</p>
                <p className="text-gray-700">Date: {selectedCard.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
