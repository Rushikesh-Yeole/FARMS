import { BrowserRouter, Routes, Route } from "react-router-dom";

import FStock from "./pages/FStock";
import Home from "./pages/Home";
import Spost from "./pages/Stockpost";
import FDPost from "./pages/FDPost";
import FDemand from "./pages/FDemand";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import TFeed from "./pages/TFeed";
import RHome from "./pages/RHome";
import RProfile from "./pages/RProfile";
import RPost from "./pages/RPost";
import RDash from "./pages/RDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spost" element={<Spost />} />
        <Route path="/fstock" element={<FStock />} />
        <Route path="/fdpost" element={<FDPost />} />
        <Route path="/fdemand" element={<FDemand />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tfeed" element={<TFeed />} />
        <Route path="/rhome" element={<RHome />} />
        <Route path="/rprofile" element={<RProfile />} />
        <Route path="/rpost" element={<RPost />} />
        <Route path="/rdash" element={<RDash />} />
      </Routes>
    </BrowserRouter>
  );
}
