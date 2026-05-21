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
        image: "/download.jpg",
        items: "1 Items",
    },
    {
        name: "Luggage & Bags",
        image: "/download (1).jpg",
        items: "0 Items",
    },
    {
        name: "Home & Kitchen",
        image: "/Mobile&Tablet.png",
        items: "1 Items",
    },
    {
        name: "Jewellery",
        image: "/Jwellery.png",
        items: "0 Items",
    },
    {
        name: "Fashion",
        image: "/fashion.png",
        items: "0 Items",
    },
    {
        name: "Furniture & Home Decor",
        image: "/Furniture.png",
        items: "4 Items",
    },
    {
        name: "Electronics & Appliances",
        image: "/Electronic.png",
        items: "4 Items",
    },
    {
        name: "Mobiles & Tablets",
        image: "/Mobile&Tablet.png",
        items: "0 Items",
    },
    {
        name: "Vehicles",
        image: "/Vehical.png",
        items: "0 Items",
    },
    {
        name: "Real Estate",
        image: "/RealEstate.png",
        items: "0 Items",
    },
    {
        name: "Beauty & Personal Care",
        image: "/Beauty.png",
        items: "0 Items",
    },
];

const Categoy = () => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate("/page1");
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    };

    return (
        <section className="w-full bg-[#f8fafc] py-10 sm:py-12 lg:py-16">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1633] leading-tight">
                        Explore{" "}
                        <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent font-extrabold">
                            Premium
                        </span>{" "}
                        Categories
                    </h2>

                    <p className="mt-4 text-base sm:text-lg lg:text-[22px] text-slate-500 font-medium leading-relaxed">
                        Pick from top categories available in your city.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            onClick={handleCategoryClick}
                            className="group relative min-h-[210px] sm:min-h-[225px] bg-[#f8f9ff] border border-[#d9cfff] rounded-2xl sm:rounded-[22px] px-4 pt-6 pb-5 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Items Badge */}
                            <span className="absolute -top-3 px-3 sm:px-4 py-1 rounded-full bg-[#12a8f5] text-white text-[11px] sm:text-[13px] font-semibold shadow">
                                {item.items}
                            </span>

                            {/* Image */}
                            <div className="w-20 h-20 sm:w-[104px] sm:h-[104px] rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Category Name */}
                            <p className="mt-4 sm:mt-5 text-sm sm:text-[16px] font-semibold text-[#1f2937] leading-5 sm:leading-6 line-clamp-2">
                                {item.name}
                            </p>

                            {/* Hover Text */}
                            <span className="mt-2 text-[11px] sm:text-[12px] text-gray-500 font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                View All Products →
                            </span>
                        </div>
                    ))}
                </div>

                {/* View All Categories Button */}
                <div className="flex justify-center mt-10 sm:mt-12">
                    <Link
                        to="/allcategory"
                        className="h-12 sm:h-[54px] px-6 sm:px-10 border border-[#5b61ff] text-[#5b61ff] rounded-full flex items-center gap-2 hover:bg-blue-50 transition duration-300"
                    >
                        <span className="text-sm sm:text-[15px] font-medium">
                            View All Categories
                        </span>
                        <IoChevronForwardOutline className="text-sm" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categoy;