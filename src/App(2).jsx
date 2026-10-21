import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

import Category from "./Category/TopCategory";
import Allcategory from "./Category/AllCategory";
import Faq from "./FAQ/Faq";
import Footer from "./Footer/Footer";
import Herosection from "./HeroSection/Herosection";
import Navbar from "./Navbar/Navbar";
import Services from "./Services/Services";
import Banner from "./Banner/Banner";
import LatestBlog from "./Blog/LatestBlog";
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
import Blogdetails from "./Blog/Blogdetails";
import Cart from "./Cart/Cart";

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

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/register" replace />;
  return children;
}

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", checkLogin);
    window.addEventListener("upleex:auth", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("upleex:auth", checkLogin);
    };
  }, []);

  const authPages = ["/register", "/mainlogin", "/signin", "/Startrating"];
  const hideNavbar = authPages.includes(location.pathname);

  // Important: don't auto-redirect from /mainlogin when the login component
  // dispatches "upleex:auth". That redirect can race with navigate("/cart").
  if (isLoggedIn && location.pathname === "/register") {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      {!hideNavbar &&
        (location.pathname === "/partner" ? <PartnerNavbar /> : <Navbar />)}

      <div className={hideNavbar ? "" : "pt-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<Blogdetails />} />
          <Route path="/topcategory" element={<Category />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainlogin" element={<MainLogin />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute>
                <PartnerWithus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute>
                <Signin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Startrating"
            element={
              <ProtectedRoute>
                <Startrating />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
