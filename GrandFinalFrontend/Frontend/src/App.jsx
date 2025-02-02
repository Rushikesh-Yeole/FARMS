import React from "react";
import RegisterProfile from "./Pages/RegisterProfile"; // Correct path for RegisterProfile component
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpPage from "./Pages/otpPage.jsx";
import TransportDemandForm from "./Pages/TransportDemand.jsx"
import HomePage from "./Pages/HomePage.jsx";
import About from "./Pages/About.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import VRfeed from "./Pages/VRfeed.jsx";
import Header from "./Components/Header.jsx";
import MyProfilePage from "./Components/MyProfilePage.jsx";
import FarmerStockForm from "./Pages/FarmerStockForm.jsx";
import RetailerDemandForm from "./Pages/RetailerRequirement.jsx";
import FarmerBestDealsPage  from "./Pages/FarmerBestDealsPage.jsx"



export default function App() {
  // const intstate = useSelector((state) => state.profile);
  // console.log(intstate.profile); // Debugging: Ensure this is printing the correct Redux state
  // const profilestate = useSelector((state) => state.profile);
  // const userdata=profilestate?.profiledata;
  //   console.log(userdata);

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        {/* Fixed Header */}
        <Header />

        <div>
          <Routes>
            <Route path="/" element={<VRfeed />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/register" element={<RegisterProfile />} />
            <Route path="/farmerstock" element={<FarmerStockForm />} />
            <Route path="/retailerpost" element={<RetailerDemandForm />} />
            <Route path="/farmerbestdeals" element={<FarmerBestDealsPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/transporterDemand" element={<TransportDemandForm/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
