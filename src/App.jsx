// App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Banner from "./Banner/Banner";
import LatestBlog from "./Blog/LatestBlog";
import Categoy from "./Category/Categoy";
import Allcategory from "./Category/Allcategory";
import Faq from "./FAQ/Faq";
import Footer from "./Footer/Footer";
import Herosection from "./HeroSection/Herosection";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import Page1 from "./Pages For Category/Page1";
import Buyer from "./Pages For Category/Buyer";

function Home() {
  return (
    <>
      <Herosection />
      <Categoy />
      <Services />
      <LatestBlog />
      <Faq />
      <Banner />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/Buyer" element={<Buyer/>} />

        </Routes>
      </div>
    </>
  );
}

export default App;