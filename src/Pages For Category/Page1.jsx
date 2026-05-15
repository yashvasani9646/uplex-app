import {
    ArrowLeft,
    SlidersHorizontal,
    ChevronDown,
    MapPin,
    Heart,
} from "lucide-react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
    const categories = ["All", "Building Materials"];
      const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen bg-[#f8fafc] w-full">
                <div className="border-b border-gray-200 bg-white">
                    <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-3">
                        {categories.map((item, index) => (
                            <button
                                key={index}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition ${index === 0
                                    ? "bg-[#5b61ff] text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 py-8">
                    <button onClick={(() => navigate("/"))}  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

                        <button className="w-full sm:w-[220px] h-11 bg-white border border-gray-200 rounded-full px-4 flex items-center justify-between text-sm text-gray-600 shadow-sm">
                            <span className="flex items-center gap-2">
                                <SlidersHorizontal
                                    size={16}
                                    className="text-[#5b61ff]"
                                />
                                All Durations
                            </span>
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    <div className="mt-10 ">
                        <Link to="/Buyer">
                            <div className="w-[320px] bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="relative p-4 pb-0 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-300 transition-all duration-300">
                                    <div className="absolute top-[10px] left-[-22px] w-[90px] bg-orange-500 text-white text-[12px] font-bold text-center py-1 rotate-[-45deg] shadow-md">
                                        Sell
                                    </div>
                                    <div className="absolute top-4 left-4 z-10">

                                        <div className="relative">
                                            <div className="absolute top-0 left-0 z-20 overflow-hidden w-20 h-20">

                                            </div>
                                        </div>
                                    </div>

                                    <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-red-500">
                                        <Heart size={18} />
                                    </button>

                                    <div className="rounded-[16px] overflow-hidden group ">
                                        <div className="rounded-[16px] overflow-hidden group flex justify-center">
                                            <img
                                                src="https://service.digitalks.co.in/s3docs/upleex/product_main_images/a144a0dd2939486d963a488910b7a86a.jpeg"
                                                alt="3-D Miniature Photoframe"
                                                className="w-[175px] h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-2 bg-transparent px-4 py-1 rounded-full text-sm font-medium shadow">
                                        Toys
                                    </div>

                                    <div className="absolute bottom-4 right-[13px] bg-gradient-to-r from-indigo-500 to-sky-500 text-white w-[85px] py-1.5 rounded-full text-sm font-bold shadow text-center">
                                        ₹2,000
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-[18px] font-medium text-[#0b1633] hover:text-[#5b61ff]">
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

                                    <button className=" cursor-pointer mt-5 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 hover:opacity-90 transition">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="pb-16 mt-16">
                        <h1 className="text-2xl font-bold text-black mb-6">
                            Looking for Home Appliances Rental?
                        </h1>

                        <p className="text-gray-600 leading-8 mb-6">
                            Let&apos;s be honest: buying appliances can hurt your wallet.
                            Not only are they expensive to buy, but you also have to
                            worry about repair costs and the hassle of moving them.
                        </p>

                        <h1 className="text-2xl font-bold text-black mb-4">
                            Introducing Upleex: Your Solution for Hassle-Free Home Living
                        </h1>

                        <p className="text-gray-600 leading-8 mb-6">
                            Imagine a world where you can enjoy top-of-the-line
                            appliances without the burden of ownership. With Upleex,
                            that world is now a reality.
                        </p>

                        <h1 className="text-2xl font-bold text-black mb-4">
                            We offer a wide range of appliances for rent, including:
                        </h1>

                        <ul className="list-disc pl-6 space-y-4 text-gray-700 leading-8 mb-8">
                            <li>
                                <span className="font-bold text-black">
                                    Refrigerator:
                                </span>{" "}
                                Keep your drinks cold and food fresh with a stylish and
                                efficient rental fridge.
                            </li>

                            <li>
                                <span className="font-bold text-black">
                                    Washing Machine:
                                </span>{" "}
                                Say goodbye to overflowing laundry baskets and hello to
                                clean clothes with our convenient washer and dryer
                                rentals.
                            </li>

                            <li>
                                <span className="font-bold text-black">
                                    Microwaves:
                                </span>{" "}
                                Quick and easy meals are just a few minutes away with our
                                selection of high-powered microwaves.
                            </li>

                            <li>
                                <span className="font-bold text-black">
                                    Air Conditioners:
                                </span>{" "}
                                Beat the heat in style with a rented air conditioner that
                                keeps you cool and comfortable all summer.
                            </li>

                            <li>
                                <span className="font-bold text-black">
                                    High-Definition TVs:
                                </span>{" "}
                                Experience the thrill of big-screen entertainment with
                                our selection of high-quality TVs on rent.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page1;