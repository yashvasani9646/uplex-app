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

  const imageUrl =
    "https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg";

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
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <button onClick={(() => navigate("/page1"))} className="w-[110px] bg-gray-200 text-black px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold border hover:bg-gray-500 transition border-transparent">
          <FaArrowLeft size={14} />
          Back
        </button>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-visible shadow-xl shadow-gray-200 hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="p-6 border-r border-gray-200 overflow-visible relative">
              {/* Main Image + Zoom */}
              <div className="relative w-full">
                <div className="flex items-start gap-6">
                  {/* Left Image */}
                  <div
                    className="w-[480px] max-w-full bg-white rounded-xl p-4 shadow-md shrink-0"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="relative overflow-hidden rounded-lg cursor-crosshair">
                      <img
                        src={imageUrl}
                        alt="Product"
                        className="w-full h-[520px] object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Zoom Panel */}
                  {showZoom && (
                    <div className="ml-[158px] w-[682px] h-[480px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-2xl shrink-0">
                      <div
                        className="w-full h-full bg-no-repeat"
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: "300%",
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
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer ${index === 0 ? "border-blue-500" : "border-gray-200"
                      } shadow-sm hover:shadow-md transition`}
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
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  3-D Miniature Photoframe
                </h1>

                <button className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:shadow-md transition">
                  <Heart size={20} />
                </button>
              </div>

              {/* Category */}
              <p className="text-sm text-blue-600 mt-2 font-medium">Toys</p>

              {/* Price Box */}
              <div className="mt-5 border border-blue-200 rounded-xl p-4 bg-blue-50 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Selling Price</p>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹2,000
                  </span>
                  <span className="line-through text-gray-400">₹2,500</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 border rounded-lg px-4 py-3 flex items-center justify-between shadow-sm">
                <span className="font-medium">Quantity</span>

                <div className="flex items-center gap-4">
                  <button className="hover:text-blue-600 transition">
                    <Minus size={16} />
                  </button>

                  <span>1</span>

                  <button className="hover:text-blue-600 transition">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add To Cart */}
              <button className="mt-4 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 hover:shadow-lg transition">
                Add To Cart
              </button>

              {/* Seller Card */}
              <div className="mt-5 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <HomeIcon size={24} className="text-sky-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 font-medium">
                        Sold By
                      </p>

                      <h3 className="text-2xl font-bold text-gray-900 leading-tight mt-1">
                        Shreeji Gift & Toys
                      </h3>

                      <p className="text-sm text-gray-500 mt-1 truncate max-w-[420px]">
                        📍 Ghanshyam Complex, Radhe Shyam Society, Vadinath
                        Chowk, Surat
                      </p>
                    </div>
                  </div>

                  <button className="px-6 py-2.5 rounded-full border-2 border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-50 transition whitespace-nowrap shrink-0">
                    View Shop
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <ShieldCheck size={22} className="text-sky-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-5">
                    KYC
                    <br />
                    Verified
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                    <ShieldCheck size={22} className="text-green-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-5">
                    Secure
                    <br />
                    Payment
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                    <Truck size={22} className="text-orange-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-5">
                    Verified
                    <br />
                    Product
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                    <RotateCcw size={22} className="text-purple-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-5">
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
          <div className="w-[560px] max-w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg py-12 px-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
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