import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Store,
    MapPin,
    Share2,
    LogIn,
    SlidersHorizontal,
    ChevronDown,
    Heart,
} from "lucide-react";
import { useEffect } from "react";

const Shop = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] py-6 sm:py-8">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                {/* Shop Header */}
                <div className="mt-5 bg-white border border-gray-200 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Left Side */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-[60px] h-[59px] rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Store size={24} className="text-sky-500" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] tracking-[0.18em] text-gray-400 font-semibold">
                                    Sold By
                                </p>

                                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0b1633] leading-tight">
                                    Shreeji Gift & Toys
                                </h1>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col items-start lg:items-end gap-2">
                            <p className="flex items-start gap-1 text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-[280px] lg:text-right">
                                <MapPin
                                    size={12}
                                    className="text-pink-500 mt-0.5 shrink-0"
                                />
                                Ghanshyam Complex Radhe Shyam Society Vadinath Chowk
                            </p>

                            <div className="flex items-center gap-2">
                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                                    <Share2 size={12} />
                                    Share
                                </button>

                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1633] text-white text-xs font-medium hover:opacity-90 transition">
                                    <LogIn size={12} />
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Title */}
                <h2 className="mt-8 text-lg sm:text-xl font-bold text-[#0b1633]">
                    Products from Shreeji Gift & Toys
                </h2>

                {/* Products Box */}
                <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm min-h-[420px]">
                    {/* Filter */}
                    <button className="w-full sm:w-[180px] h-11 rounded-full border border-gray-200 bg-white px-4 flex items-center justify-between text-sm text-gray-600 shadow-sm">
                        <span className="flex items-center gap-2">
                            <SlidersHorizontal
                                size={15}
                                className="text-[#5b61ff]"
                            />
                            All Types
                        </span>
                        <ChevronDown size={15} />
                    </button>

                    {/* Product Card */}
                    <div className="mt-6">
                        <div className="group w-full max-w-[270px] bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            {/* Image Section */}
                            <div className="relative p-4 pb-0">
                                {/* Sell Ribbon */}
                                <div className="absolute top-[10px] left-[-22px] w-[90px] bg-orange-500 text-white text-[12px] font-bold text-center py-1 rotate-[-45deg] shadow-md z-10">
                                    Sell
                                </div>

                                {/* Wishlist */}
                                <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500">
                                    <Heart size={16} />
                                </button>

                                {/* Product Image */}
                                <div className="rounded-[16px] overflow-hidden flex justify-center bg-white">
                                    <img
                                        src="/RealEstate.png"
                                        alt="3-D Miniature Photoframe"
                                        className="w-[140px] h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Category */}
                                <div className="absolute bottom-4 left-3 text-xs font-medium text-gray-600">
                                    Toys
                                </div>

                                {/* Price Badge */}
                                <div className="absolute bottom-4 right-3 bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                                    ₹2,000
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-[17px] font-semibold text-[#0b1633] leading-snug group-hover:text-[#5b61ff] transition">
                                    3-D Miniature Photoframe
                                </h3>

                                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        <span>Surat</span>
                                    </div>

                                    <span className="line-through text-gray-400">
                                        ₹2500/Sell
                                    </span>
                                </div>

                                <button className="mt-4 w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 hover:opacity-90 transition">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;