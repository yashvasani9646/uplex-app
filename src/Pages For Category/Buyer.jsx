// Buyer.jsx

import { FaArrowLeft } from "react-icons/fa6";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  HomeIcon,
  CameraOff,
  ShoppingCart, ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const thumbnails = [
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg",
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg",
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg",
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg",
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg",
  ];

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1360px] mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/page1")}
          className="w-[110px] bg-gray-200 text-black px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold border border-transparent hover:bg-gray-300 transition"
        >
          <FaArrowLeft size={14} />
          Back
        </button>

        {/* Main Card */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-visible shadow-2xl shadow-gray-400 hover:shadow-2xl hover:shadow-gray-500 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="p-6 border-r border-gray-200 overflow-visible relative">
              <div className="relative w-full">
                <div className="flex items-start gap-6">
                  {/* Main Image */}
                  <div
                    className="w-[480px] bg-white rounded-2xl shadow-md shrink-0 mx-auto h-[400px] flex justify-center items-start"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="relative overflow-hidden cursor-crosshair w-[300px] h-[400px]">
                      <img
                        src={selectedImage}
                        alt="Product"
                        draggable={false}
                        className="w-full h-full object-cover object-top select-none pointer-events-none transition-opacity duration-300"
                      />
                    </div>
                  </div>

                  {/* Zoom Panel */}
                  {/* Zoom Panel */}
                  {showZoom && (
                    <div
                      className="
      absolute
      top-0
      left-[658px]
      w-[620px]
      h-[460px]
      rounded-xl
      overflow-hidden
      border
      border-gray-200
      bg-white
      shadow-2xl
      z-50
      pointer-events-none
    "
                    >
                      <div
                        className="w-full h-full bg-no-repeat"
                        style={{
                          backgroundImage: `url(${selectedImage})`,
                          backgroundSize: "220%", // video jaisa smooth zoom
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 justify-center flex-wrap">
                {thumbnails.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition ${selectedImage === img
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

            {/* RIGHT SIDE */}
            <div className="p-6">
              {/* Title + Wishlist */}
              <div className="flex justify-between items-start gap-4 max-w-[620px]">
                <h1 className="text-3xl font-bold text-gray-900">
                  3-D Miniature Photoframe
                </h1>

                <button className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:shadow-md transition shrink-0">
                  <Heart size={20} />
                </button>
              </div>

              {/* Category */}
              <p className="text-sm text-blue-600 mt-2 font-medium w-[51px] text-center p-1 rounded-2xl bg-sky-100">
                Toys
              </p>

              {/* Selling Price */}
              <div className="mt-5 w-full max-w-[620px] h-[95px] border border-[#c7dbff] rounded-[14px] px-5 py-4 bg-[#f8fbff] shadow-sm relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-16 h-16 bg-[#eef4ff] rounded-full" />

                <div className="relative z-10 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#19a7ff] rounded-full"></span>
                  <p className="text-[14px] font-semibold text-[#1797f2]">
                    Selling Price
                  </p>
                </div>

                <div className="relative z-10 flex items-end gap-2 mt-2">
                  <span className="text-[30px] leading-none font-extrabold text-[#081c4a]">
                    ₹2,000
                  </span>

                  <span className="text-[18px] leading-none font-medium text-[#a0a9b8] line-through mb-0.5">
                    ₹2,500
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 border border-black rounded-[14px] px-4 py-3 flex items-center justify-between bg-white shadow-sm w-full max-w-[620px] h-[55px]">
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

                <div className="flex items-center gap-5 bg-[#f8f9fb] px-4 py-2 rounded-[10px] min-w-[130px] justify-center">
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
                <div className="flex items-start justify-between gap-3">
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

                      <p className="text-[12px] text-gray-500 mt-1 truncate max-w-[320px]">
                        📍 Ghanshyam Complex, Radhe Shyam Society, Vadinath Chowk, Surat
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-1.5 rounded-full border-2 border-indigo-500 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-50 transition whitespace-nowrap shrink-0">
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
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-200 flex gap-8">
          <button className="pb-3 border-b-2 border-blue-500 text-blue-600 font-semibold">
            Description
          </button>
          <button className="pb-3 text-gray-500 font-medium">
            Product Details
          </button>
          <button className="pb-3 text-gray-500 font-medium">
            Reviews & Ratings
          </button>
        </div>

        {/* Description Content */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-10">
          <div className="w-[500px] h-[300px] max-w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg py-12 px-8 text-center">
            <div className="w-16 h-10   mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <CameraOff size={28} className="text-gray-300" />
            </div>

            <h2 className="text-2xl font-bold text-[#0f172a] mb-3">
              No Product Details Available
            </h2>

            <p className="text-gray-500 text-base leading-7">
              Detailed specifications for this product have not been added yet.
              <br />
              Please check back later or contact the seller for more
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer;