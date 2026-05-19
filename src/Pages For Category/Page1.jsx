

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

    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("All Types");
    const typeRef = useRef(null);

    const typeOptions = ["All Types", "Rent", "Sell"];

    // ===== APNE useEffect KO ISSE REPLACE KARO =====
    useEffect(() => {
        const handleClickOutside = (event) => {
            // All Types Dropdown Close
            if (
                typeRef.current &&
                !typeRef.current.contains(event.target)
            ) {
                setIsTypeOpen(false);
            }

            // Duration Dropdown Close
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
                        {/* Filters */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            {/* All Types Dropdown */}
                            <div
                                className="relative w-full sm:w-[220px]"
                                ref={typeRef}
                            >
                                <button
                                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    className={`w-full h-11 bg-white rounded-full px-4 flex items-center justify-between border-2 transition-all duration-300 shadow-sm ${isTypeOpen
                                            ? "border-[#5b61ff] shadow-[0_8px_20px_rgba(91,97,255,0.12)]"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <SlidersHorizontal
                                            size={16}
                                            className="text-[#5b61ff]"
                                        />
                                        <span className="text-[14px] font-medium text-black">
                                            {selectedType}
                                        </span>
                                    </span>

                                    {isTypeOpen ? (
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

                                {isTypeOpen && (
                                    <div className="absolute top-[52px] left-0 w-full bg-white rounded-[18px] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50 border border-[#ece9ff]">
                                        {typeOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSelectedType(option);
                                                    setIsTypeOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-[14px] font-medium transition ${selectedType === option
                                                        ? "bg-[#f5f2ff] text-[#5b61ff]"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <span>{option}</span>

                                                {selectedType === option && (
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

                            {/* Duration Dropdown */}
                           
                        </div>

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
                    {/* Description Section */}
                    <div className="mt-12 text-[#0b1633]">
                        <h2 className="text-[24px] sm:text-[32px] font-bold leading-tight">
                            Looking for Home Appliances Rental?
                        </h2>

                        <p className="mt-3 text-[13px] sm:text-[14px] leading-7 text-gray-600">
                            Let's be honest: buying appliances can hurt your wallet. Not only are
                            they expensive to buy, but you also have to worry about repair costs
                            and the hassle of moving them.
                        </p>

                        <h3 className="mt-8 text-[20px] sm:text-[24px] font-bold leading-tight">
                            Introducing Upleex: Your Solution for Hassle-Free Home Living
                        </h3>

                        <p className="mt-3 text-[13px] sm:text-[14px] leading-7 text-gray-600">
                            Imagine a world where you can enjoy top-of-the-line appliances without
                            the burden of ownership. With Upleex, that world is now a reality.
                        </p>

                        <h3 className="mt-8 text-[20px] sm:text-[24px] font-bold leading-tight">
                            We offer a wide range of appliances for rent, including:
                        </h3>

                        <ul className="mt-4 space-y-3 text-[13px] sm:text-[14px] leading-7 text-gray-600 list-disc pl-6">
                            <li>
                                <strong className="text-[#0b1633]">Refrigerator:</strong> Keep your
                                drinks cold and food fresh with a stylish and efficient rental
                                fridge.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Washing Machine:</strong> Say
                                goodbye to overflowing laundry baskets and hello to clean clothes
                                with our convenient washer and dryer rentals.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Microwaves:</strong> Quick and
                                easy meals are just a few minutes away with our selection of
                                high-powered microwaves.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Air Conditioners:</strong> Beat
                                the heat in style with a rented air conditioner that keeps you cool
                                and comfortable all summer.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">
                                    High-Definition TVs:
                                </strong>{" "}
                                Experience the thrill of big-screen entertainment with our selection
                                of high-quality TVs on rent.
                            </li>
                        </ul>

                        <h1 className="mt-8 text-[18px] sm:text-[24px] font-bold leading-tight">
                            Who Can Benefit from Renting Appliances?
                        </h1>

                        <ul className="mt-4 space-y-3 text-[13px] sm:text-[14px] leading-7 text-gray-600 list-disc pl-6">
                            <li>
                                <strong className="text-[#0b1633]">
                                    Students & Young Professionals:
                                </strong>{" "}
                                Setting up your first apartment? Renting appliances is a
                                budget-friendly way to furnish your space.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">New Homeowners:</strong>{" "}
                                Furnishing your dream home shouldn't break the bank. Rent appliances
                                and spread out the costs over time.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Frequent Movers:</strong> Tired
                                of the hassle of transporting bulky appliances? Renting provides the
                                ultimate convenience.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Event Hosts:</strong> Need extra
                                appliances for a party or gathering? Rent what you need and return
                                it when you're done.
                            </li>
                        </ul>

                        <h1 className="mt-8 text-[18px] sm:text-[22px] font-bold leading-tight">
                            Why Choose Upleex?
                        </h1>

                        <ul className="mt-4 space-y-3 text-[13px] sm:text-[14px] leading-7 text-gray-600 list-disc pl-6">
                            <li>
                                <strong className="text-[#0b1633]">Effortless Browsing:</strong>{" "}
                                Find the perfect appliance rental with our easy-to-use website and
                                app.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">
                                    Flexible Rental Plans:
                                </strong>{" "}
                                Rent for as long or as short as you need — weekly, monthly, or
                                longer.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Convenient Delivery:</strong> We
                                deliver your chosen appliances right to your doorstep.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">
                                    Hassle-Free Maintenance:
                                </strong>{" "}
                                Enjoy worry-free use — we handle any maintenance issues.
                            </li>
                            <li>
                                <strong className="text-[#0b1633]">Easy Returns:</strong> Return or
                                swap your appliances when you're finished with them.
                            </li>
                        </ul>

                        <h3 className="mt-8 text-[20px] sm:text-[24px] font-bold text-[#5b61ff] leading-tight">
                            Upgrade Your Lifestyle Today!
                        </h3>

                        <p className="mt-4 max-w-9xl text-[15px] sm:text-[16px] leading-8 sm:leading-9 text-gray-600">
                            Renting appliances online with Upleex is the smart choice for modern
                            living. Experience the freedom and flexibility of enjoying high-quality
                            appliance rental service without the long-term commitment.
                        </p>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default Page1;