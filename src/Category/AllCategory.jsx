import { FiSearch } from "react-icons/fi";
import { IoCheckmark, IoChevronForwardOutline } from "react-icons/io5";
import { useState } from "react";

const categories = [
    "Luggage & Bags",
    "Home & Kitchen",
    "Jewellery",
    "Fashion",
    "Furniture & Home Decor",
    "Electronics & Appliances",
    "Mobiles & Tablets",
    "Vehicles",
    "Real Estate",
];
const products = [
    {
        name: "Travel Luggage",
        image:
            "public/Meeting.png",
    },
    {
        name: "Backpacks",
        image:
            "public/Meeting.png",
    },
    {
        name: "Handbags & Purses",
        image:
            "public/Meeting.png",
    },
    {
        name: "Duffel & Gym Bags",
        image:
            "public/Meeting.png",
    },
    {
        name: "Laptop & Office Bags",
        image:
            "public/Meeting.png",
    },
    {
        name: "Kids Bags",
        image:
            "public/Meeting.png",
    },
    {
        name: "Travel Accessories",
        image:
            "public/Meeting.png",
    },
    {
        name: "Specialty Bags",
        image:
            "public/Meeting.png",
    },
];

const Allcategory = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <div className="w-full min-h-screen bg-[#f7f8fc] pt-[140px] px-5">

            <div className="max-w-[1700px] mx-auto flex items-start gap-5">

                {/* SIDEBAR */}
                <div className="w-[340px] min-w-[340px] bg-white border border-gray-200 rounded-[24px] p-5 shadow-sm">

                    {/* SEARCH */}
                    <div className="relative">

                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full h-[46px] rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-[14px] outline-none"
                        />

                    </div>

                    {/* CATEGORY LIST */}
                    <div className="mt-5 h-auto overflow-y-auto pr-1 space-y-2">

                        {categories.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedCategory(index)}
                                className={`flex items-center justify-between px-4 h-[56px] rounded-xl cursor-pointer transition-all duration-300
                                
                                ${selectedCategory === index
                                        ? "bg-[#f3f0ff] text-[#635bff]"
                                        : "hover:bg-gray-100 text-[#334155]"
                                    }`}
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`w-2.5 h-2.5 rounded-full
                                        
                                        ${selectedCategory === index
                                                ? "bg-[#635bff]"
                                                : "bg-gray-300"
                                            }`}
                                    ></div>

                                    <p className="text-[15px] font-semibold">
                                        {item}
                                    </p>

                                </div>

                                <div
                                    className={`w-6 h-6 rounded-md border flex items-center justify-center
                                    
                                    ${selectedCategory === index
                                            ? "bg-[#635bff] border-[#635bff] text-white"
                                            : "border-gray-300"
                                        }`}
                                >
                                    {selectedCategory === index && (
                                        <IoCheckmark className="text-[11px]" />
                                    )}
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm min-h-[760px]">

                    {/* HEADER */}
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#ece8ff]">

                                <img
                                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            <div>

                                <h2 className="text-[20px] font-bold text-[#0f172a]">
                                    Luggage & Bags
                                </h2>

                                <p className="text-[14px] text-gray-500 mt-1">
                                    9 Subcategories
                                </p>

                            </div>

                        </div>

                        <button className="flex items-center gap-1 text-[#635bff] font-semibold text-[16px] hover:underline">

                            View All

                            <IoChevronForwardOutline className="text-sm" />

                        </button>

                    </div>

                    {/* PRODUCT GRID */}
                    <div className="grid grid-cols-4 gap-5 mt-6">

                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer"
                            >

                                {/* IMAGE */}
                                <div className="rounded-[20px] overflow-hidden bg-gray-100">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                </div>

                                {/* TITLE */}
                                <h3 className="text-center text-[16px] font-bold text-[#0f172a] mt-4 leading-snug transition duration-300 group-hover:text-[#635bff]">

                                    {item.name}

                                </h3>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Allcategory;