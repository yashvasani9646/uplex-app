// App.jsx
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
import PartnerNavbar from "./Partnerwith_us/PartnerNavbar";
import Signin from "./Partnerwith_us/Signin";
import Startrating from "./Partnerwith_us/Startrating";

import Register from "../LoginField/Register";
import MainLogin from "../LoginField/MainLogin";

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

  const authPages = [
    "/",
    "/register",
    "/mainlogin",
    "/signin",
    "/Startrating",
  ];

  const hideNavbar = authPages.includes(location.pathname);

  return (
    <div>
      {/* Navbar */}
      {!hideNavbar &&
        (location.pathname === "/partner" ? (
          <PartnerNavbar />
        ) : (
          <Navbar />
        ))}

      {/* Page Content */}
      <div className={hideNavbar ? "" : "pt-32"}>
        <Routes>
          {/* Register / Login */}
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainlogin" element={<MainLogin />} />

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Main Pages */}
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />

          {/* Partner Pages */}
          <Route path="/partner" element={<PartnerWithus />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Startrating" element={<Startrating />} />

          {/* Category */}
          <Route path="/topcategory" element={<Category />} />
        </Routes>
      </div>

      <ToastContainer
        className="uplex-toast"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        draggableDirection="y"
        theme="light"
        limit={3}
      />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;