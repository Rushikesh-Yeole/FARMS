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
import TransportReq from "./Pages/transportReq.jsx";
import Dummy from "./Pages/Dummy.jsx";
import MyStock from "./Pages/myStock.jsx";
import ConfRequest from "./Pages/confReq.jsx";


import Contact from "./Pages/Contact.jsx";
import Home from "./Pages/Home.jsx";
import RetailerSbestDeals from "./Pages/RetailerSbestDeals.jsx"
import FarmerDashboard from "./Pages/Farmer/FarmerDashBoard.jsx"
import Transport from "./Pages/Transport.jsx";
import TransporterDashboard from "./Pages/TransporterDashboard.jsx";
import TransporterVehicleForm from "./Pages/TransporterVehicleForm.jsx";
import FarmerInsight from "./Pages/Farmerinsight.jsx";
import Footer from "./Components/Footer.jsx"

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
            <Route path="/gohome" element={<Home/>} />
            <Route path="/register" element={<RegisterProfile />} />
            <Route path="/farmerstock" element={<FarmerStockForm />} />
            <Route path="/farmerdashbaord" element={<FarmerDashboard />} />
            <Route path="/farmerinsight" element={<FarmerInsight />} />
            <Route path="/retailerpost" element={<RetailerDemandForm />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/contactus" element={<Contact/>}></Route>
            <Route path="/farmerbestdeals" element={<FarmerBestDealsPage />} />
            <Route path="/retailerbestdeals" element={<RetailerSbestDeals />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/transporterDemand" element={<TransportDemandForm/>}/>
            <Route path="/transporterDashboard" element={<TransporterDashboard/>}/>
            <Route path="/transportervehicleform" element={<TransporterVehicleForm/>}/>       
            <Route path="/tranporterfeed" element={<TransportReq/>}/>
            <Route path="/dummy" element={<Dummy/>}/>
            <Route path ="/dummy/myStock"element={<MyStock/>}/>
            <Route path="/dummy/confRequset" element={<ConfRequest/>}/>
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
