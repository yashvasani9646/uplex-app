import { IoChevronForwardOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const categories = [
    {
        name: "Building materials",
        image: "/images.jpg",
        items: "0 Items",
    },
    {
        name: "Toys",
        image:
            "/download.jpg",
        items: "1 Items",
    },
    
    {
        name: "Luggage & Bags",
        image:
            "/download (1).jpg",
        items: "0 Items",
    },
    {
        name: "Home & Kitchen",
        image:
            "/Home&Kitchen.jpg",
        items: "1 Items",
    },
    {
        name: "Jewellery",
        image:
            "/Jwellery.png",
        items: "0 Items",
    },
    {
        name: "Fashion",
        image:
            "/fashion.png",
        items: "0 Items",
    },
    {
        name: "Furniture & Home Decor",
        image:
            "/Furniture.png",
        items: "4 Items",
    },
    {
        name: "Electronics & Appliances",
        image:
            "/Electronic.png",
        items: "4 Items",
    },
    {
        name: "Mobiles & Tablets",
        image:
            "/Mobile&Tablet.png",
        items: "0 Items",
    },
    {
        name: "Vehicles",
        image:
            "/Vehical.png",
        items: "0 Items",
    },
    {
        name: "Real Estate",
        image:
            "/RealEstate.png",
        items: "0 Items",
    },
    {
        name: "Beauty & Personal Care",
        image:
            "/Beauty.png",
        items: "0 Items",
    },
];

const Categoy = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#f8fafc] py-8">
            <div className="max-w-[1360px] mx-auto px-4">
                {/* HEADING */}
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0b1633] leading-tight">
                        Explore{" "}
                        <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
                            Premium
                        </span>{" "}
                        Categories
                    </h2>

                    <p className="text-lg md:text-[22px] text-slate-500 mt-4 font-medium">
                        Pick from top categories available in your city.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-12 cursor-pointer">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="group relative h-[225px] bg-[#f8f9ff] hover:bg-purple-500/5 border border-[#d9cfff] rounded-[22px] px-4 pt-6 pb-5 flex flex-col items-center justify-start hover:-translate-y-3 hover:shadow-xl transition-all duration-300"
                        >
                            {/* ITEMS BADGE */}
                            <span className="absolute -top-3 px-4 py-1 rounded-full bg-[#12a8f5] text-white text-[13px] font-semibold shadow">
                                {item.items}
                            </span>

                            {/* IMAGE */}
                            <div className="w-[104px] h-[104px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="mt-5 text-[16px] font-semibold text-center text-[#1f2937] leading-6 line-clamp-2">
                                {item.name}
                            </p>

                            <button
                                onClick={() => {
                                    navigate("/page1");
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "auto",
                                    });
                                }}
                                className="mt-2 text-[12px] text-gray-500 font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                            >
                                View All Products →
                            </button>
                        </div>
                    ))}
                </div>
                {/* BUTTON */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/allcategory"
                        className="h-[54px] px-10 border border-[#5b61ff] text-[#5b61ff] rounded-full flex items-center gap-2 hover:bg-blue-50 transition duration-300"
                    >
                        <span className="text-[15px] font-medium">
                            View All Categories
                        </span>

                        <IoChevronForwardOutline className="text-sm" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Categoy;