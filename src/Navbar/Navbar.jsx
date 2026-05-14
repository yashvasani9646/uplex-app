// Navbar.jsx
import { useState } from "react";
import logo from "../assets/upleex-logo-dark.webp";

import {
    CiLocationOn,
    CiSearch,
    CiMobile1,
    CiMenuFries,
} from "react-icons/ci";

import {
    IoChevronDownOutline,
    IoCloseOutline,
} from "react-icons/io5";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const categories = [
        {
            title: "Building Materials & Construction",
            submenu: ["Cement", "Steel", "Tiles", "Paint"],
        },
        {
            title: "Toys",
            submenu: ["Remote Cars", "Dolls", "Games", "Puzzles"],
        },
        {
            title: "Luggage & Bags",
            submenu: ["Suitcases", "Backpacks", "Travel Bags"],
        },
        {
            title: "Home & Kitchen",
            submenu: ["Cookware", "Furniture", "Decor"],
        },
        {
            title: "Jewellery",
            submenu: ["Necklaces", "Rings", "Bracelets"],
        },
        {
            title: "Fashion",
            submenu: ["Clothing", "Shoes", "Accessories"],
        },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
            {/* Same container for both top navbar and category navbar */}
            <div className="max-w-[1360px] mx-auto px-6 lg:px-8">
                {/* ================= TOP NAVBAR ================= */}
                <div className="h-[75px] flex items-center justify-between gap-6">
                    {/* Left Section */}
                    <div className="flex items-center gap-8 flex-1">
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="Upleex"
                            className="w-[170px] object-contain shrink-0"
                        />


                        <div className="hidden lg:flex flex-1 max-w-[500px] h-[45px] border border-gray-300 bg-white overflow-hidden">
                            {/* City Selector */}
                            <div className="w-[210px] px-4 flex items-center gap-3 border-r border-gray-300 text-gray-700">
                                <CiLocationOn className="text-[22px] text-indigo-500" />
                                <span className="text-[16px] font-medium">Select City</span>
                                <IoChevronDownOutline className="ml-auto text-gray-400 text-sm" />
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 px-5 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search for Electronics"
                                    className="w-full bg-transparent outline-none text-[16px] text-gray-700 placeholder:text-gray-400"
                                />
                                <CiSearch className="text-[28px] text-gray-400 shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Right Menu */}
                    <div className="hidden lg:flex items-center text-[15px] font-medium text-gray-700 shrink-0">
                        <button className="flex items-center gap-2 px-4 border-r border-gray-300 hover:text-indigo-600">
                            <CiMobile1 className="text-[20px]" />
                            Download App
                        </button>

                        <button className="px-4 border-r border-gray-300 hover:text-indigo-600">
                            Plan
                        </button>

                        <button className="px-4 border-r border-gray-300 hover:text-indigo-600 whitespace-nowrap">
                            Partner With Us
                        </button>

                        <button className="ml-4 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-lg hover:scale-105 transition duration-300 whitespace-nowrap ">
                            Login / Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(true)}
                        className="lg:hidden text-3xl"
                    >
                        <CiMenuFries />
                    </button>
                </div>

                {/* ================= CATEGORY NAVBAR ================= */}
                <div className="hidden lg:flex items-center gap-1.5 pb-3 max-w-[1100px] w-full ">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => setOpenMenu(index)}
                            onMouseLeave={() => setOpenMenu(null)}

                        >
                            <button className="h-[50px] px-4 bg-[#f5f5f7] rounded-lg flex items-center gap-2 text-[15px] font-medium text-[#334155] whitespace-nowrap hover:bg-indigo-600 hover:text-white">
                                {item.title}
                                <IoChevronDownOutline className="text-[14px] text-gray-400 shrink-0" />
                            </button>

                            {/* Dropdown */}
                            {openMenu === index && (
                                <div className="absolute top-[56px] left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 ">
                                    {item.submenu.map((sub, i) => (
                                        <div
                                            key={i}
                                            className="px-5 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer"
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= MOBILE SIDEBAR ================= */}
            {mobileMenu && (
                <div className="fixed inset-0 bg-black/40 z-[60] lg:hidden">
                    <div className="w-[300px] h-full bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <img src={logo} alt="Upleex" className="w-32" />

                            <button
                                onClick={() => setMobileMenu(false)}
                                className="text-3xl"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        <div className="space-y-5 text-lg font-medium text-gray-700">
                            <p>Download App</p>
                            <p>Plan</p>
                            <p>Partner With Us</p>
                            <p>Login / Sign Up</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;