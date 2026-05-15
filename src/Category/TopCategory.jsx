import { IoChevronForwardOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const categories = [
    {
        name: "Building materials",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/44c21c18dc72453bb531449db6092abc.png",
        items: "0 Items",
    },
    {
        name: "Toys",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/1cff1246f75b416fbcf2e0fd5007ebbd.png",
        items: "1 Items",
    },
    {
        name: "Luggage & Bags",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/b2bacbe5a94d4f4b8708085c21a86071.png",
        items: "0 Items",
    },
    {
        name: "Home & Kitchen",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/2933ec8480cd42cf867cc6f649a5900a.png",
        items: "1 Items",
    },
    {
        name: "Jewellery",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/c6fbd44ff1224ae8bd8ef7ed7508661b.jpeg",
        items: "0 Items",
    },
    {
        name: "Fashion",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/104fa6563c7e4dd387dc496056a3f77d.png",
        items: "0 Items",
    },
    {
        name: "Furniture & Home Decor",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/6696ad19650842f2b3dfef39b89b3592.png",
        items: "4 Items",
    },
    {
        name: "Electronics & Appliances",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/d074845f65404156898c92b70d25db15.png",
        items: "4 Items",
    },
    {
        name: "Mobiles & Tablets",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/c192f574bd604ec390bbfdcca6b4faa3.png",
        items: "0 Items",
    },
    {
        name: "Vehicles",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/0f0eaf0b472c43ebae4baf3389a44db1.png",
        items: "0 Items",
    },
    {
        name: "Real Estate",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/c2f0bfdd7fad41ac912ad207148a45c9.png",
        items: "0 Items",
    },
    {
        name: "Beauty & Personal Care",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/1b7262d03b794781aa7f7b8988527569.png",
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