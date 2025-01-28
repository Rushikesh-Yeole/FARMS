import React from "react";
import RegisterProfile from "./Pages/RegisterProfile"; // Correct path for RegisterProfile component
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpPage from "./Pages/otpPage";
import HomePage from "./Pages/HomePage";

export default function App() {
  const intstate = useSelector((state) => state.Profile);
  console.log(intstate); // Debugging: Ensure this is printing the correct Redux state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterProfile />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
