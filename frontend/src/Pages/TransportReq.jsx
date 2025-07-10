import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transreq, acceptinvite } from "../store/transReq"; // Adjust the path

export default function TransportReq() {
  const dispatch = useDispatch();
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Get data from Redux store
  const { loading, error } = useSelector((state) => state.transReq);

  // Fetch data on mount
  useEffect(() => {
    dispatch(transreq()).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        const fetchedData = result.payload?.data || [];
        console.log("Fetched Data:", fetchedData);
        setCards(fetchedData);
        setFilteredCards(fetchedData); // Initialize filtered list
      }
    });
  }, [dispatch]);

  // Handle filtering
  const handleApply = () => {
    const filtered = cards.filter((card) =>
      (fromInput ? card.Departlocations?.[0]?.place.toLowerCase().includes(fromInput.toLowerCase()) : true) &&
      (toInput ? card.Destination?.place.toLowerCase().includes(toInput.toLowerCase()) : true) &&
      (dateInput ? card.date === dateInput : true)
    );
    setFilteredCards(filtered);
  };

  // Accept request handler
  const acceptRequestHandler = (id) => {
    dispatch(acceptinvite(id));
  };

  // Handle card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="bg-green-100 min-h-screen p-4">
      {/* Input Fields */}
      <div className="bg-green-200 p-4 shadow-md rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* From Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="from" className="text-green-700 font-medium">From:</label>
            <input
              type="text"
              id="from"
              placeholder="Enter origin"
              value={fromInput}
              onChange={(e) => setFromInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          {/* To Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="to" className="text-green-700 font-medium">To:</label>
            <input
              type="text"
              id="to"
              placeholder="Enter destination"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          {/* Date Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="date" className="text-green-700 font-medium">Date:</label>
            <input
              type="date"
              id="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="px-2 py-1 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
            />
          </div>

          {/* Apply Filter Button */}
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div
              key={card._id}
              onClick={() => handleCardClick(card)}
              className="bg-white shadow-md rounded-lg w-full max-w-md p-4 flex justify-between items-center cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-green-700 font-medium">From: {card.Departlocations?.[0]?.place || 'Unknown'}</p>
                <p className="text-green-700 font-medium">To: {card.Destination?.place || 'Unknown'}</p>
                <button
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click event
                    acceptRequestHandler(card._id);
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 font-medium">No matching data found</p>
        )}
      </div>
    </div>
  );
}
