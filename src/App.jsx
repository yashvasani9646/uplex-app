// App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Banner from "./Banner/Banner";
import LatestBlog from "./Blog/LatestBlog";
import Category from "./Category/TopCategory";
import Allcategory from "./Category/AllCategory";
import Faq from "./FAQ/Faq";
import Footer from "./Footer/Footer";
import Herosection from "./HeroSection/Herosection";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import Page1 from "./Pages For Category/Page1";
import Buyer from "./Pages For Category/Buyer";
import Shop from "./Pages For Category/Shop";

function Home() {
  return (
    <div>
      <Herosection />
      <Category />
      <Services />
      <LatestBlog />
      <Faq />
      <Banner />
      <Footer />
    </div>


  );
}

function App() {
  return (
    <div>
      <Navbar />

      <div className="pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/Buyer" element={<Buyer />} />
          <Route path="/shop" element={<Shop/>} />


        </Routes>
      </div>
    </div >

  );
}

export default App;