// Responsive updates applied to your Page1 component.
// Fixed widths were converted to fluid layouts, spacing was adjusted,
// and the product card now scales properly on all screen sizes.

import {
    ArrowLeft,
    SlidersHorizontal,
    ChevronDown,
    ChevronUp,
    CalendarDays,
    MapPin,
    Heart,
    Check,
} from "lucide-react";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Page1 = () => {
    const categories = ["All", "Building Materials"];
    const navigate = useNavigate();

    const [isDurationOpen, setIsDurationOpen] = useState(false);
    const [selectedDuration, setSelectedDuration] =
        useState("All Durations");

    const durationRef = useRef(null);

    const durationOptions = [
        "All Durations",
        "Daily",
        "Monthly",
        "Hourly",
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                durationRef.current &&
                !durationRef.current.contains(event.target)
            ) {
                setIsDurationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <>
            <div className="min-h-screen bg-[#f8fafc] w-full">
                {/* Category Tabs */}
                <div className="border-b border-gray-200 bg-white">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 overflow-x-auto">
                        {categories.map((item, index) => (
                            <button
                                key={index}
                                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${index === 0
                                    ? "bg-[#5b61ff] text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    {/* Filters */}
                    {/* Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        {/* All Types */}
                        <button className="w-full sm:w-[220px] h-11 bg-white border border-gray-200 rounded-full px-4 flex items-center justify-between text-sm text-gray-600 shadow-sm">
                            <span className="flex items-center gap-2">
                                <SlidersHorizontal
                                    size={16}
                                    className="text-[#5b61ff]"
                                />
                                All Types
                            </span>
                            <ChevronDown size={16} />
                        </button>

                        {/* Duration Dropdown */}
                        <div
                            className="relative w-full sm:w-[260px] sm:ml-auto"
                            ref={durationRef}
                        >
                            <button
                                onClick={() =>
                                    setIsDurationOpen(!isDurationOpen)
                                }
                                className={`w-full h-11 bg-white rounded-full px-4 flex items-center justify-between border-2 transition-all duration-300 shadow-sm ${isDurationOpen
                                        ? "border-[#5b61ff] shadow-[0_8px_20px_rgba(91,97,255,0.12)]"
                                        : "border-gray-200"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarDays
                                        size={16}
                                        className="text-[#5b61ff]"
                                    />
                                    <span className="text-[14px] font-medium text-black">
                                        {selectedDuration}
                                    </span>
                                </span>

                                {isDurationOpen ? (
                                    <ChevronUp
                                        size={16}
                                        className="text-[#5b61ff]"
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        className="text-[#5b61ff]"
                                    />
                                )}
                            </button>

                            {isDurationOpen && (
                                <div className="absolute top-[52px] right-0 w-full sm:w-[260px] bg-white rounded-[18px] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50">
                                    {durationOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedDuration(option);
                                                setIsDurationOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[14px] font-medium transition ${selectedDuration === option
                                                    ? "bg-[#f5f2ff] text-[#5b61ff]"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span>{option}</span>

                                            {selectedDuration === option && (
                                                <Check
                                                    size={16}
                                                    className="text-[#5b61ff]"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to="/Buyer" className="block">
                            <div className="w-full max-w-[320px] mx-auto bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="relative p-4 pb-0">
                                    <div className="absolute top-[10px] left-[-22px] w-[90px] bg-orange-500 text-white text-[12px] font-bold text-center py-1 rotate-[-45deg] shadow-md">
                                        Sell
                                    </div>

                                    <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-red-500">
                                        <Heart size={18} />
                                    </button>

                                    <div className="rounded-[16px] overflow-hidden group flex justify-center">
                                        <img
                                            src="/RealEstate.png"
                                            alt="3-D Miniature Photoframe"
                                            className="w-[175px] h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="absolute bottom-4 left-2 px-4 py-1 rounded-full text-sm font-medium">
                                        Toys
                                    </div>

                                    <div className="absolute bottom-4 right-3 bg-gradient-to-r from-indigo-500 to-sky-500 text-white w-[85px] py-1.5 rounded-full text-sm font-bold shadow text-center">
                                        ₹2,000
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-medium text-[#0b1633] hover:text-[#5b61ff] transition">
                                        3-D Miniature Photoframe
                                    </h3>

                                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            <span>Surat</span>
                                        </div>

                                        <span className="line-through text-gray-400">
                                            ₹2500/Sell
                                        </span>
                                    </div>

                                    <button className="mt-5 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 hover:opacity-90 transition">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page1;