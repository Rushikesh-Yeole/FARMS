import React from "react";
import RegisterProfile from "./Pages/RegisterProfile"; // Correct path for RegisterProfile component
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpPage from "./Pages/otpPage.jsx";
import TransportDemandForm from "./Pages/TransportDemand.jsx";
import HomePage from "./Pages/HomePage.jsx";
import About from "./Pages/About.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
// import VRfeed from "./Pages/VRfeed.jsx";
import Header from "./Components/Header.jsx";
import MyProfilePage from "./Components/MyProfilePage.jsx";
import FarmerStockForm from "./Pages/FarmerStockForm.jsx";
import RetailerDemandForm from "./Pages/RetailerRequirement.jsx";
import FarmerBestDealsPage from "./Pages/FarmerBestDealsPage.jsx";
import TransportReq from "./Pages/TransportReq.jsx";
import Dummy from "./Pages/Dummy.jsx";
import MyStock from "./Pages/myStock.jsx";
import ConfRequest from "./Pages/confReq.jsx";

import Contact from "./Pages/Contact.jsx";
import Home from "./Pages/Home.jsx";
import RetailerSbestDeals from "./Pages/RetailerSbestDeals.jsx";
import FarmerDashboard from "./Pages/Farmer/FarmerDashBoard.jsx";
import Transport from "./Pages/Transport.jsx";
import TransporterDashboard from "./Pages/TransporterDashboard.jsx";
import TransporterVehicleForm from "./Pages/TransporterVehicleForm.jsx";
import FarmerInsight from "./Pages/Farmerinsight.jsx";
import Footer from "./Components/Footer.jsx";
import RetailerDashboard from "./Pages/Reatailerdashboard.jsx";
import TransporterHome from "./Components/TransporterHome.jsx";
// import ConsumerHome from "./Components/ConsumerHome.jsx";
import ConsumerForm from "./Pages/ConForm.jsx";
// import FarmerHome from "./Components/FarmerHome.jsx";
import ConsumerDashboard from "./Pages/Consumerdashboard.jsx";
import  Loader  from "./assets/animation/Loader.jsx"
import ConsumerBestDeals from "./Pages/ConsumerBestDeals.jsx";
import Retailerinsight from "./Pages/Retailerinsight.jsx";
// import RetailerSbestDeals from "./Pages/RetailerSbestDeals.jsx";
import { SiRotaryinternational } from "react-icons/si";
import ExportHome from "./Components/ExportHome.jsx";
import ExporterDashboard from "./Pages/ExportDashBoard.jsx";
import ExporterbestDeals from "./Pages/Exporterbestdeals";
import Notification from "./Components/Notification.jsx"
import ExporterDemandForm from "./Pages/ExportDemandForm"
export default function App() {
  // const intstate = useSelector((state) => state.profile);
  // console.log(intstate.profile); // Debugging: Ensure this is printing the correct Redux state
  // const profilestate = useSelector((state) => state.profile);
  // const userdata=profilestate?.profiledata;
  //   console.log(userdata);
  //   console.log(userdata);

  return (
    <BrowserRouter>
      <div className=" flex flex-col">
        {/* Fixed Header */}
        <Header />
        <div className="">
          <Routes>
        <Route path="/notification" element={<Notification />} />
            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<Contact />}></Route>

            {/* Farmer Routing */}
            <Route path="/farmerstock" element={<FarmerStockForm />} />
            <Route path="/farmerdashbaord" element={<FarmerDashboard />} />
            <Route path="/farmerinsight" element={<FarmerInsight />} />
            <Route path="/farmerbestdeals" element={<FarmerBestDealsPage />} />
            <Route
              path="/transporterDemand"
              element={<TransportDemandForm />}
            />

            

            {/* Retailer Routing */}
            <Route path="/retailerpost" element={<RetailerDemandForm />} />
            <Route path="/retailerDashboard" element={<RetailerDashboard />} />
            <Route path="/retailerinsight" element={<Retailerinsight />} />
            <Route path="/retailerBestDeal" element={<RetailerSbestDeals/>}/>
          
            {/* Transport Routing */}
           
            <Route path="/transport" element={<Transport />} />
            <Route path="/tranporterfeed" element={<TransportReq />} />
            <Route
              path="/transporterDashboard"
              element={<TransporterDashboard />}
            />

            {/* Consumer Routing */}
            <Route path="/consumerform" element={<ConsumerForm />} />
            <Route path="/ConsumerDashboard" element={<ConsumerDashboard />} />

          
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/register" element={<RegisterProfile />} />


            <Route path="/exportdemand" element={<ExporterDemandForm/>}></Route>
            {/* <Route path="/exportDashBoard" element={<ExportDashboard/>}</Route> */}
            {/* <Route path="/exportdashboard" element={<ExporterDashboard/>}></Route> */}
            <Route path="/exporthome" element={<ExportHome/>}></Route>
            <Route path="/exportbestdeals" element={<ExporterbestDeals/>}></Route>

            <Route path="/otp" element={<OtpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/profile" element={<MyProfilePage />} />

     
            <Route
              path="/transportervehicleform"
              element={<TransporterVehicleForm />}
            />
          
            <Route path="/dummy" element={<Dummy />} />
            <Route path="/dummy/myStock" element={<MyStock />} />
            <Route path="/dummy/confRequset" element={<ConfRequest />} />
            <Route path="/retailerDashboard" element={<RetailerDashboard />} />
            <Route path="/ConsumerDashboard" element={<ConsumerDashboard />} />
            <Route path="/loader" element={<Loader/>} />
            <Route path="/consumerbestdeals" element={<ConsumerBestDeals/>} />

          </Routes>
        </div>
        <Footer></Footer>
      </div>
     </BrowserRouter>
  );
}
