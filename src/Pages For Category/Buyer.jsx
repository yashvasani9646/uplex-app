
import { FaArrowLeft } from "react-icons/fa6";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  HomeIcon,
  ShoppingCart, ArrowRight,
  User
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";




const Buyer = () => {

  const thumbnails = [
    "/RealEstate.png",
    "/RealEstate.png",
    "/RealEstate.png",
    "/RealEstate.png",
    "/RealEstate.png",
  ];

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const [activeTab, setActiveTab] = useState("details");

  const navigate = useNavigate();
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto", 
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/page1")}
            className="w-fit min-w-[110px] bg-gray-200 text-black px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold border border-transparent hover:bg-gray-300 transition"
          >
            <FaArrowLeft size={14} />
            Back
          </button>

          {/* Main Card */}
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-visible shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT SIDE */}
              <div className="p-4 sm:p-6 lg:border-r border-gray-200 overflow-visible relative">
                <div className="relative w-full">
                  <div className="flex items-start gap-6">
                    {/* Main Image */}
                    <div
                      className="w-full max-w-[480px] h-[320px] sm:h-[400px] bg-white rounded-2xl shadow-md mx-auto flex justify-center items-start"
                      onMouseEnter={() => setShowZoom(true)}
                      onMouseLeave={() => setShowZoom(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="relative overflow-hidden cursor-crosshair w-full max-w-[300px] h-full">
                        <img
                          src={selectedImage}
                          alt="Product"
                          draggable={false}
                          className="w-full h-full object-cover object-top select-none pointer-events-none"
                        />
                      </div>
                    </div>


                    {showZoom && (
                      <div className="hidden xl:block absolute top-0 left-[calc(100%+24px)] w-[620px] h-[460px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-2xl z-50 pointer-events-none">

                        <div
                          className="w-full h-full bg-no-repeat"
                          style={{
                            backgroundImage: `url(${"/RealEstate.png"})`,
                            backgroundSize: "220%", // video jaisa smooth zoom
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  {thumbnails.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition ${selectedImage === img
                        ? "border-blue-500"
                        : "border-gray-200"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start gap-4 max-w-[620px]">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    3-D Miniature Photoframe
                  </h1>

                  <button className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:shadow-md transition shrink-0">
                    <Heart size={20} />
                  </button>
                </div>

                <p className="inline-block text-sm text-blue-600 mt-2 font-medium px-3 py-1 rounded-2xl bg-sky-100">
                  Toys
                </p>

                <div className="mt-5 w-full max-w-[620px] min-h-[95px] border border-[#c7dbff] rounded-[14px] px-4 sm:px-5 py-4 bg-[#f8fbff] shadow-sm relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-[#eef4ff] rounded-full" />

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#19a7ff] rounded-full"></span>
                    <p className="text-[14px] font-semibold text-[#1797f2]">
                      Selling Price
                    </p>
                  </div>

                  <div className="relative z-10 flex items-end gap-2 mt-2 flex-wrap">
                    <span className="text-2xl sm:text-[30px] leading-none font-extrabold text-[#081c4a]">
                      ₹2,000
                    </span>

                    <span className="text-base sm:text-[18px] leading-none font-medium text-[#a0a9b8] line-through mb-0.5">
                      ₹2,500
                    </span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 border border-black rounded-[14px] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white shadow-sm w-full max-w-[620px]">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#081c4a] leading-none">
                      Quantity
                    </h3>

                    <p className="text-[10px] text-gray-500 mt-1 leading-none">
                      Select units
                    </p>

                    <p className="text-[10px] text-[#ff6b00] font-medium mt-1 leading-none">
                      12 available
                    </p>
                  </div>

                  <div className="flex items-center gap-5 bg-[#f8f9fb] px-4 py-2 rounded-[10px] min-w-[130px] justify-center self-start sm:self-auto">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="text-gray-300 hover:text-blue-600 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-[15px] font-bold text-[#081c4a] min-w-[20px] text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="text-gray-500 hover:text-blue-600 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Add To Cart */}
                <button className="mt-4 w-full max-w-[620px] py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 hover:shadow-lg transition flex items-center justify-center gap-3">
                  <ShoppingCart size={20} />
                  <span className="cursor-pointer">Add To Cart</span>
                  <ArrowRight size={18} />
                </button>

                {/* Seller Card */}
                <div className="mt-5 border border-transparent rounded-[16px] p-3 bg-white shadow-sm w-full max-w-[620px]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <HomeIcon size={20} className="text-sky-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-gray-500 font-bold">
                          Sold By
                        </p>

                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mt-1">
                          Shreeji Gift & Toys
                        </h3>

                        <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                          📍 Ghanshyam Complex, Radhe Shyam Society, Vadinath Chowk, Surat
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/shop")}
                      className="px-4 py-1.5 rounded-full border-2 border-indigo-500 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-50 transition whitespace-nowrap self-start sm:self-auto"
                    >
                      View Shop
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center w-full max-w-[620px]">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <ShieldCheck size={16} className="text-sky-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      KYC
                      <br />
                      Verified
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                      <ShieldCheck size={16} className="text-green-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      Secure
                      <br />
                      Payment
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                      <Truck size={16} className="text-orange-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      Verified
                      <br />
                      Product
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                      <RotateCcw size={16} className="text-purple-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      100%
                      <br />
                      Refund
                    </p>
                  </div>

                </div>

              </div>

            </div>
            {/* Tabs Section */}
            {/* Tabs Section */}
            <div className="mt-8 bg-white border border-gray-200 overflow-hidden shadow-sm">
              {/* Tabs Header */}
              <div className="border-b border-gray-200 flex overflow-x-auto px-4 sm:px-8 pt-3">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 pt-3 pb-1 text-[14px]  font-semibold leading-none transition ${activeTab === "description"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  Description
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-4 text-[14px] font-semibold transition ${activeTab === "details"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  Product Details
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-4 text-[14px] font-semibold transition ${activeTab === "reviews"
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  Reviews & Ratings
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-[#fafafa] text-gray-300 px-4 sm:px-9 py-6 sm:py-7 min-h-[140px]">
                {/* Description */}
                {activeTab === "description" && (
                  <div className="text-[15px] text-[#081c4a]">
                    <p>This is 8×10 inch size 3d miniature photoframe</p>
                    <p>acrylic material with LED lights.</p>
                    <p>customised 3d miniature photoframe.</p>
                  </div>
                )}

                {/* Product Details */}
                {activeTab === "details" && (
                  <div className="min-h-[360px] flex items-center justify-center">
                    <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-[18px] shadow-sm px-6 sm:px-8 py-10 sm:py-12 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.172 9.172a4 4 0 015.656 5.656M15 9l-6 6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3l18 18"
                          />
                        </svg>
                      </div>

                      <h3 className="mt-6 text-[18px] md:text-[20px] font-bold text-[#081c4a]">
                        No Product Details Available
                      </h3>

                      <p className="mt-4 text-[14px] leading-7 text-gray-500 max-w-[320px] mx-auto">
                        Detailed specifications for this product have not been added yet.
                      </p>

                      <p className="mt-1 text-[14px] leading-7 text-gray-500 max-w-[320px] mx-auto">
                        Please check back later or contact the seller for more information.
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviews & Ratings */}
                {activeTab === "reviews" && (
                  <div>
                    {/* Rating Summary */}
                    <div className="bg-[#eef4ff] rounded-2xl px-4 sm:px-6 py-4 border border-gray-100">
                      <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="text-center min-w-[120px]">
                          <h2 className="text-[48px] leading-none font-bold text-[#081c4a]">
                            0.0
                          </h2>

                          <div className="flex justify-center gap-1 mt-1 text-gray-300 text-lg">
                            <span>☆</span>
                            <span>☆</span>
                            <span>☆</span>
                            <span>☆</span>
                            <span>☆</span>
                          </div>

                          <p className="mt-1 text-[13px] text-gray-500">
                            0 reviews
                          </p>
                        </div>

                        <div className="flex-1 w-full space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-3">
                              <span className="w-3 text-sm text-gray-600">{star}</span>
                              <span className="text-gray-300 text-sm">☆</span>
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full"></div>
                              <span className="text-sm text-gray-500">0</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Write Review */}
                    <div className="mt-8 bg-white border border-gray-200 rounded-2xl px-4 sm:px-6 py-4">
                      <h3 className="text-[20px] font-bold text-[#081c4a]">
                        Write a Review
                      </h3>

                      <div className="text-center py-5">
                        <p className="text-gray-500 text-[16px] mb-3">
                          Please login to write a review
                        </p>

                        <button className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition">
                          Login to Review
                        </button>
                      </div>
                    </div>

                    {/* Customer Reviews */}
                    <div className="mt-8">
                      <h3 className="text-[20px] font-bold text-[#081c4a]">
                        Customer Reviews (0)
                      </h3>

                      <div className="mt-4 bg-gray-100 border border-gray-100 rounded-2xl py-6 text-center">
                        <div className="flex justify-center items-center text-gray-300">
                          <User size={48} strokeWidth={1.5} />
                        </div>
                        <p className="mt-2 text-[16px] text-gray-500">
                          No reviews yet. Be the first to review!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}


          {/* Description / Product Details / Reviews Section */}


          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
              <h2 className="text-[20px] font-bold text-[#081c4a]">
                You May Also Like
              </h2>
            </div>

            {/* Product Cards */}
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Product Card */}
                <div className="group cursor-pointer w-full max-w-[270px] mx-auto bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ">
                  {/* Image Section */}
                  <div className="relative p-3 pb-0">
                    {/* Sell Badge */}
                    <div className="absolute top-[8px] left-[-20px] w-[80px] bg-orange-500 text-white text-[10px] font-bold text-center py-1 rotate-[-45deg] shadow-md z-10">
                      Sell
                    </div>

                    {/* Wishlist Icon */}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm z-10 cursor-pointer">
                      <Heart size={16} className="text-gray-500" />
                    </button>

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="/images.jpg"
                        alt="48 PCS CAR CONTAINER"
                        className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Category + Price */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-white text-[#081c4a] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                        Toys
                      </span>

                      <span className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[16px] font-bold px-3 py-1 rounded-full shadow-md">
                        ₹599
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 pt-3">
                    {/* New Badge */}
                    <span className="inline-block bg-green-100 text-green-600 text-[10px] font-semibold px-2.5 py-1 rounded-md">
                      NEW
                    </span>

                    {/* Product Title */}
                    <h3 className="mt-3 text-[14px] font-bold text-[#081c4a] leading-5 hover:text-blue-400">
                      48 PCS CAR CONTAINER
                    </h3>

                    {/* Location + Old Price */}
                    <div className="mt-2 flex items-center justify-between text-[12px]">
                      <span className="text-gray-500">📍 Surat</span>
                      <span className="text-gray-400 line-through">
                        ₹1000/Sell
                      </span>
                    </div>

                    {/* Buy Button */}
                    <button className="mt-4 w-full py-2.5 rounded-lg text-white text-[14px] font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition cursor-pointer">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Buyer;