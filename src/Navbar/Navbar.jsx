import { useState } from "react";
import logo from "../assets/upleex-logo-dark.webp";
import {
    CiLocationOn,
    CiSearch,
    CiMobile1,
    CiHeart,
    CiMenuFries,
} from "react-icons/ci";
import {
    IoChevronDownOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
} from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const categories = [
        {
            title: "Building Materials & construction",
            submenu: ["T-Shirts", "Jeans", "Shoes", "Jackets"],
        },
        {
            title: "Toys",
            submenu: ["Notebooks", "Staplers", "Files", "Markers"],
        },
        {
            title: "Luggage & Bags",
            submenu: ["Camping", "Tools", "Medical", "Bags"],
        },
        {
            title: "Home & Kitchen",
            submenu: ["Printer", "Scanner", "Laptop", "Chair"],
        },
        {
            title: "Jewellery",
            submenu: ["Toys", "Baby Dress", "Bottle", "Walker"],
        },
        {
            title: "Fashion",
            submenu: ["Books", "Notes", "Guide", "Dictionary"],
        },
    ];

    return (
        <div className="w-full bg-white border-b border-gray-100 fixed top-0 z-50">

            <div className="max-w-[1400px] mx-auto px-4 py-3">

                {/* Top Navbar */}
                <div className="flex items-center justify-between gap-4">

                    {/* Left */}
                    <div className="flex items-center gap-4">

                        <img src={logo} alt="logo" className="w-32 sm:w-40" />

                        {/* Search Desktop */}
                        <div className="hidden lg:flex border-2 border-zinc-300 rounded-md overflow-hidden hover:border-blue-400 duration-300">

                            <div className="flex items-center gap-2 px-4 py-3 border-r w-52">
                                <CiLocationOn className="text-xl text-blue-500" />
                                <p>Select City</p>
                                <IoChevronDownOutline className="ml-auto" />
                            </div>

                            <div className="flex items-center px-4 w-[320px]">
                                <input
                                    type="text"
                                    placeholder="Search for Medical"
                                    className="outline-none w-full"
                                />
                                <CiSearch className="text-2xl text-gray-500" />
                            </div>

                        </div>

                    </div>

                    {/* Desktop Right */}
                    <div className="hidden lg:flex items-center gap-5 text-gray-700">

                        <div className="flex items-center gap-2 cursor-pointer">
                            <CiMobile1 className="text-lg" />
                            <p className="font-medium">Download App</p>
                        </div>

                        <p className="font-medium cursor-pointer">Plan</p>

                        <p className="font-medium cursor-pointer">
                            Partner With Us
                        </p>


                        <button className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 hover:scale-105 duration-300">
                            Login / Sign Up
                        </button>

                        <FaRegBell className="text-2xl" />
                        <MdOutlineShoppingCart className="text-2xl" />
                        <CiHeart className="text-2xl" />

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(true)}
                        className="lg:hidden text-3xl"
                    >
                        <CiMenuFries />
                    </button>

                </div>

                {/* Categories Desktop */}
                <div className="hidden lg:flex items-center gap-2 pt-3 whitespace-nowrap">

                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => setOpenMenu(index)}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <div className="px-3 h-11 bg-gray-100 rounded-md flex items-center gap-1 cursor-pointer hover:bg-indigo-500 hover:text-white duration-300">
                                <span className="text-[15px] font-medium">
                                    {item.title}
                                </span>

                                <IoChevronDownOutline className="text-sm" />
                            </div>

                            {openMenu === index && (
                                <div className="absolute top-12 left-0 w-60 bg-white rounded-xl shadow-xl py-2">
                                    {item.submenu.map((sub, i) => (
                                        <div
                                            key={i}
                                            className="px-4 py-3 hover:bg-indigo-100 cursor-pointer"
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="px-4 h-11 border border-blue-500 text-blue-600 rounded-full flex items-center gap-2 cursor-pointer ml-auto hover:bg-blue-100">
                        <button className="text-[15px] font-medium">
                            View All Categories
                        </button>

                        <IoChevronForwardOutline className="text-sm" />
                    </div>

                </div>

            </div>

            {/* Mobile Sidebar */}
            {mobileMenu && (
                <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">

                    <div className="w-[280px] h-full bg-white p-5">

                        <div className="flex justify-between items-center mb-6">
                            <img src={logo} alt="logo" className="w-28" />

                            <button
                                onClick={() => setMobileMenu(false)}
                                className="text-3xl"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        <div className="space-y-4 text-[17px] font-medium text-gray-700">
                            <p>Home</p>
                            <p>Plan</p>
                            <p>Partner With Us</p>
                            <p>Download App</p>
                            <p>Login / Sign Up</p>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Navbar;