import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transreq } from "../store/transReq"; // Adjust the path

export default function TransportReq() {
  const dispatch = useDispatch();
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  //  Get data from Redux store
  

  //  Dispatch thunk on mount
  useEffect(() => {
    dispatch(transreq()).then((result)=>{
        if(result.meta.requestStatus ==="fulfilled"){
            const data1 = result.payload;
            console.log("IN PHHHHHH",data1);
            setCards(data1.data)
        }
    });
    console.log("useEffect1");
  },[]);

  //  Update local state when data changes
 
  const reState = useSelector((state) => state.transReq);
  //  Handle filtering
  const handleApply = () => {
    
        
    

    // Update cards with the filtered results
  };

  const handleCardClick = (card) => {

    setSelectedCard(card); // Set selected card on click
    
  };

  return (
    <div className="bg-green-100 min-h-screen p-4">
      {/* Input Fields */}
      <div className="bg-green-200 p-4 shadow-md rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
        {cards.loading ? (
          <p>Loading...</p>
        ) : cards.error ? (
          <p className="text-red-500">{reState.error}</p>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card._id}
              onClick={() => handleCardClick(card)}
              className="bg-white shadow-md rounded-l   g w-full max-w-md p-4 flex justify-between items-center cursor-pointer hover:shadow-lg"
            >
              <div>
                <p className="text-green-700 font-medium">From: {card.Departlocations?.[0]?.place || 'Unknown'}</p>
                <p className="text-green-700 font-medium">To: {card.Destination?.place || 'Unknown'}</p>
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
