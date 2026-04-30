import { IoChevronForwardOutline } from "react-icons/io5";


const categories = [
    {
        name: "Clothing & Fashion",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/7352c781d62b4693890e0cd3f7f77c7a.jpg",
        items: "2 Items",
    },
    {
        name: "Stationery Supplies",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/6ffa2c7d6f6944718e6433d9564acbd0.jpg",
        items: "14 Items",
    },
    {
        name: "Miscellaneous",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/f2802d79a93f488395aad4ab3bb7f824.png",
        items: "4 Items",
    },
    {
        name: "Office Equipment",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/3768df879a0e4ddb894545ae8f276c88.jpg",
        items: "1 Items",
    },
    {
        name: "Baby & Kids Products",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/a5064c66e04c48ea981f762de968f260.png",
        items: "0 Items",
    },
    {
        name: "Books & Study Material",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/4143a75ead4848fe95fb66b5d9da3a83.png",
        items: "0 Items",
    },
    {
        name: "Medical",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/7ad0ebe4ed6a4100aec641488b79e417.png",
        items: "0 Items",
    },
    {
        name: "Electronics",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/c94510a85eee4d9f9bcd0dbf2e3a9915.jpg",
        items: "3 Items",
    },
    {
        name: "Furniture",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/eb93b719bf934837ab34f86cde966981.jpg",
        items: "0 Items",
    },
    {
        name: "Sports",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/225b40a996964216bf1034f844f79696.jpg",
        items: "0 Items",
    },
    {
        name: "Beauty Products",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/5b13c7ec452b49c599541ea167abce31.png",
        items: "0 Items",
    },
    {
        name: "Home Decor",
        image:
            "https://service.digitalks.co.in/s3docs/upleex/categories_image/7352c781d62b4693890e0cd3f7f77c7a.jpg",
        items: "0 Items",
    },
];

const Categoy = () => {
    return (
        <div className="w-full bg-white py-10">
            <div className="max-w-[1400px] mx-auto px-4">

                <h2 className="text-6xl font-bold text-center text-[#0b1633] leading-tight">
                    Explore{" "}
                    <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
                        Premium
                    </span>{" "}
                    Categories
                </h2>

                <p className="text-center text-[26px] text-slate-500 mt-1 font-medium">
                    Pick from top categories available in your city.
                </p>

                <div className="grid grid-cols-6 gap-5 mt-14">

                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-[260px] border border-purple-200 rounded-3xl bg-white px-4 pt-8 pb-5 flex flex-col items-center justify-start hover:shadow-xl transition-all duration-300"
                        >

                            <span className="absolute -top-4 px-5 py-1 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-md">
                                {item.items}
                            </span>

                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-28 h-28 object-cover rounded-full"
                            />

                            {/* Name */}
                            <p className="mt-6 text-[17px] font-semibold text-center text-gray-800 leading-6">
                                {item.name}
                            </p>

                        </div>
                    ))}

                    <div className="col-span-6 mx-auto mt-8">
                        <div className="px-8 h-11 border border-blue-500 text-blue-600 rounded-full flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition duration-300">

                            <button className="text-[15px] font-medium">
                                View All Categories
                            </button>

                            <IoChevronForwardOutline className="text-sm" />

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Categoy;