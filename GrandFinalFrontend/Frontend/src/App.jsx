import React from "react";
import RegisterProfile from "./Pages/RegisterProfile"; // Correct path for RegisterProfile component
import { useSelector,useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpPage from "./Pages/otpPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import About from "./Pages/About.jsx";
import LoginPage from "./Pages/loginPage.jsx";



export default function App() {
  // const intstate = useSelector((state) => state.profile);
  // console.log(intstate.profile); // Debugging: Ensure this is printing the correct Redux state
  const profilestate = useSelector((state) => state.profile);
  const userdata=profilestate?.profiledata;
    console.log(userdata);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterProfile />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/About" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
}
