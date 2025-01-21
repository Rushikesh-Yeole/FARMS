import Header from "./Components/Header"
import VCarousel  from "./Components/VCarousel"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VRfeed  from "./Pages/VRfeed";
import About from "./Pages/About";
export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Header />} />
       
        <Route path="/about" element={<About />} />
        
      </Routes>

      <VCarousel/>
      <VRfeed/>
    </BrowserRouter>
  );
}
