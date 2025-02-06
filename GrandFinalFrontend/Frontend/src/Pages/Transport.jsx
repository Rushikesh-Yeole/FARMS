import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { transreq } from "../store/transReq";
import { acceptinvite } from "../store/transReq";
import {
  FaLongArrowAltRight,
  FaCalendarAlt,
  FaTruck,
  FaUser,
  FaPhone,
  FaBox,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ArrowDown } from "lucide-react";
const initialData = [
  {
    id: 1,
    from: "City A",
    to: "City B",
    quantity: 500,
    date: "2024-12-20",
    time: "14:30",
    farmer: {
      name: "John Doe",
      contact: "123-456-7890",
      address: "123 Farm Road, City A",
    },
    retailer: {
      name: "Fresh Market",
      contact: "098-765-4321",
      address: "456 Market Street, City B",
    },
  },
  {
    id: 2,
    from: "City A",
    to: "City Y",
    quantity: 300,
    date: "2024-12-21",
    time: "09:45",
    farmer: {
      name: "Alice Smith",
      contact: "987-654-3210",
      address: "789 Ranch Lane, City A",
    },
    retailer: {
      name: "Green Grocers",
      contact: "555-123-4567",
      address: "321 Store Ave, City Y",
    },
  },
  {
    id: 3,
    from: "City M",
    to: "City N",
    quantity: 250,
    date: "2024-12-22",
    time: "11:15",
    farmer: {
      name: "Bob Johnson",
      contact: "555-666-7777",
      address: "456 Field Drive, City M",
    },
    retailer: {
      name: "Super Foods",
      contact: "777-888-9999",
      address: "987 Retail Road, City N",
    },
  },
];

const getArrowDirection = (from, to) => {
  const cities = ["City A", "City B", "City M", "City N", "City Y"];
  const fromIndex = cities.indexOf(from);
  const toIndex = cities.indexOf(to);
  return fromIndex <= toIndex ? "right" : "left";
};

const InfoCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
      <Icon className="text-green-600 text-xl" />
      <h4 className="text-lg font-semibold text-green-800">{title}</h4>
    </div>
    {children}
  </div>
);

export default function Transport() {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [cards, setCards] = useState(initialData);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleApply = () => {
    const filtered = initialData.filter((card) => {
      const matchesFrom =
        fromInput === "" || card.from.toLowerCase() === fromInput.toLowerCase();
      const matchesTo =
        toInput === "" || card.to.toLowerCase() === toInput.toLowerCase();
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

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(transreq()).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            const fetchedData = result.payload?.data || [];
            console.log("Fetched Data:", fetchedData);
            setCards(fetchedData);
            setFilteredCards(fetchedData); // Initialize filtered list
          }
        });
  },[dispatch])
  const handleAcceptRequest = (_id) => {
    if (selectedCard) {
      // Remove the accepted card from the list
      dispatch(acceptinvite(_id));
      setCards((prevCards) =>
        prevCards.filter((card) => card._id !== selectedCard._id)
      );
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Find Transport Routes
        </h2>
        <div className="flex  flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="From"
              value={fromInput}
              onChange={(e) => setFromInput(e.target.value)}
              className="flex-1 px-4  py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <FaLongArrowAltRight className="text-green-600 hidden sm:block text-xl" />
            <ArrowDown className="text-green-600 sm:hidden text-xl" />
            <input
              type="text"
              placeholder="To"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg 
                           hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick(card)}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 
                         transition-all duration-300 cursor-pointer border-l-4 border-green-600"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <p className="text-gray-700">
                      From:{" "}
                      <span className="text-green-700 font-semibold">
                        {card.Departlocations?.place}
                      </span>
                    </p>
                  </div>
                  <FaCalendarAlt className="text-green-600" />
                </div>
                <div className="flex justify-center">
                  {getArrowDirection(card.from, card.to) === "down" ? (
                    <FaLongArrowAltRight className="text-2xl border-black text-green-600" />
                  ) : (
                    <FaLongArrowAltRight className="text-2xl text-green-600 transform rotate-240" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <p className="text-gray-700">
                    To:{" "}
                    <span className="text-green-700 font-semibold">
                      {card.Destination?.place}
                    </span>
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Available:{" "}
                    {new Date(card.DepatrureDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No routes available
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center w-full items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-xl w-full  p-6 relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Transport Details
            </h3>

            {/* Route Information */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-semibold">
                    {selectedCard.Departlocations?.place}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaTruck className="text-2xl text-green-600" />
                  </motion.div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {selectedCard.Destination?.place}
                  </span>
                  <FaMapMarkerAlt className="text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  <span>
                    {new Date(selectedCard.DepatrureDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBox className="text-green-600" />
                  <span>{selectedCard.quantities} units</span>
                </div>
              </div>
            </div>

            {/* Farmer and Retailer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InfoCard title="Farmer Information" icon={FaUser}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-700">
                      {selectedCard.FarmerIds?.firstName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-700">
                      {selectedCard.FarmerIds?.contactNumber}
                    </span>
                  </div>
                </div>
              </InfoCard>
            </div>

            {/* Accept Button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleAcceptRequest(selectedCard._id)}
                className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 
                  bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105"
              >
                Accept Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}