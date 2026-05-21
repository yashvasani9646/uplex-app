// App.jsx
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

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
import Login from "./LoginPage/Login";
import PartnerWithus from "./Partnerwith_us/PartnerWithus";
import PartnerNavbar from "../src/Partnerwith_us/PartnerNavbar";
import Signin from "./Partnerwith_us/Signin";
import Startrating from "./Partnerwith_us/Startrating";

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

function AppContent() {
  const location = useLocation();

  return (
    <div>

      {location.pathname === "/signin" || location.pathname === "/Startrating" ? null : location.pathname === "/partner" ? (
        <PartnerNavbar />
      ) : (
        <Navbar />
      )}
      <div className={location.pathname === "/signin" ? "" : "pt-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/partner" element={<PartnerWithus />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Startrating" element={<Startrating />} />

        </Routes>
      </div>

    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;