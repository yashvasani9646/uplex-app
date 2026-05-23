import { FiSearch } from "react-icons/fi";
import {
    IoCheckmark,
    IoChevronForwardOutline,
} from "react-icons/io5";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Allcategory = () => {

    const { t } = useTranslation();

    const categories = [
        t("luggage_bags"),
        t("home_kitchen"),
        t("jewellery"),
        t("fashion"),
        t("furniture_decor"),
        t("electronics_appliances"),
        t("mobiles_tablets"),
        t("vehicles"),
        t("real_estate"),
    ];

    const products = [
        { name: t("travel_luggage"), image: "/Meeting.png" },
        { name: t("backpacks"), image: "/Meeting.png" },
        { name: t("handbags_purses"), image: "/Meeting.png" },
        { name: t("duffel_bags"), image: "/Meeting.png" },
        { name: t("laptop_bags"), image: "/Meeting.png" },
        { name: t("kids_bags"), image: "/Meeting.png" },
        { name: t("travel_accessories"), image: "/Meeting.png" },
        { name: t("specialty_bags"), image: "/Meeting.png" },
    ];

    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);

    return (
        <section className="w-full min-h-screen bg-[#f7f8fc] pt-28 sm:pt-32 lg:pt-[140px] px-4 sm:px-6 lg:px-5">

            <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row items-start gap-5">

                {/* Sidebar */}
                <aside className="w-full lg:w-[340px] lg:min-w-[340px] bg-white border border-gray-200 rounded-3xl p-4 sm:p-5 shadow-sm">

                    {/* Search */}
                    <div className="relative">

                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                            type="text"
                            placeholder={t("search_categories")}
                            className="w-full h-11 sm:h-[46px] rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm outline-none"
                        />

                    </div>

                    {/* Category List */}
                    <div className="mt-5 space-y-2 max-h-[500px] lg:max-h-none overflow-y-auto pr-1">

                        {categories.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedCategory(index)}
                                className={`w-full flex items-center justify-between px-4 h-14 rounded-xl transition-all duration-300 text-left ${
                                    selectedCategory === index
                                        ? "bg-[#f3f0ff] text-[#635bff]"
                                        : "text-[#334155] hover:bg-gray-100"
                                }`}
                            >

                                <div className="flex items-center gap-3 min-w-0">

                                    <span
                                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                            selectedCategory === index
                                                ? "bg-[#635bff]"
                                                : "bg-gray-300"
                                        }`}
                                    />

                                    <span className="text-sm sm:text-[15px] font-semibold truncate">
                                        {item}
                                    </span>

                                </div>

                                <span
                                    className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                                        selectedCategory === index
                                            ? "bg-[#635bff] border-[#635bff] text-white"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {selectedCategory === index && (
                                        <IoCheckmark className="text-[11px]" />
                                    )}
                                </span>

                            </button>
                        ))}
                    </div>
                </aside>

                {/* Right Content */}
                <div className="flex-1 w-full bg-white border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-sm min-h-[760px]">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-4 min-w-0">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-[#ece8ff] shrink-0">

                                <img
                                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop"
                                    alt="Category"
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            <div className="min-w-0">

                                <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] truncate">
                                    {categories[selectedCategory]}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {t("subcategories")}
                                </p>

                            </div>
                        </div>

                        <button className="inline-flex items-center gap-1 text-[#635bff] font-semibold text-sm sm:text-base hover:underline shrink-0">

                            {t("view_all")}

                            <IoChevronForwardOutline className="text-sm" />

                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-6">

                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer"
                            >

                                <div className="rounded-2xl sm:rounded-[20px] overflow-hidden bg-gray-100">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-32 sm:h-40 lg:h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                </div>

                                <h3 className="mt-3 sm:mt-4 text-center text-sm sm:text-base font-bold text-[#0f172a] leading-snug group-hover:text-[#635bff] transition-colors duration-300">
                                    {item.name}
                                </h3>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Allcategory;