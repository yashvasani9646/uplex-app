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
        <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Navbar */}
                <div className="h-[72px] flex items-center justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-4 lg:gap-8 flex-1 min-w-0">
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="Upleex"
                            className="w-[130px] sm:w-[150px] lg:w-[170px] object-contain shrink-0 cursor-pointer"
                        />

                        {/* Search Bar */}
                        <div className="hidden lg:flex flex-1 max-w-[650px] h-[45px] border border-gray-300 bg-white overflow-hidden rounded-lg">
                            {/* City Selector */}
                            <div className="w-[210px] px-4 flex items-center gap-3 border-r border-gray-300 text-gray-700 shrink-0">
                                <CiLocationOn className="text-[22px] text-indigo-500" />
                                <span className="text-[15px] font-medium">
                                    Select City
                                </span>
                                <IoChevronDownOutline className="ml-auto text-gray-400 text-sm" />
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 px-5 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search for Electronics"
                                    className="w-full bg-transparent outline-none text-[15px] text-gray-700 placeholder:text-gray-400"
                                />
                                <CiSearch className="text-[26px] text-gray-400 shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Desktop Right Menu */}
                    <div className="hidden lg:flex items-center text-[14px] font-medium text-gray-700 shrink-0">
                        <button className="flex items-center gap-2 px-4 border-r border-gray-300 hover:text-indigo-600 transition">
                            <CiMobile1 className="text-[20px]" />
                            Download App
                        </button>

                        <button className="px-4 border-r border-gray-300 hover:text-indigo-600 transition">
                            Plan
                        </button>

                        <button className="px-4 border-r border-gray-300 hover:text-indigo-600 transition whitespace-nowrap">
                            Partner With Us
                        </button>

                        <button className="ml-4 px-5 xl:px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-lg hover:opacity-90 transition whitespace-nowrap">
                            Login / Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(true)}
                        className="lg:hidden text-3xl text-gray-700 shrink-0"
                    >
                        <CiMenuFries />
                    </button>
                </div>

                {/* Mobile Search Bar */}
                <div className="lg:hidden pb-4">
                    <div className="w-full h-11 border border-gray-300 rounded-lg bg-white flex items-center px-4">
                        <CiSearch className="text-[22px] text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Desktop Categories */}
                <div className="hidden lg:flex items-center justify-between pb-3 gap-4">
                    {/* Categories */}
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                        {categories.map((item, index) => (
                            <div
                                key={index}
                                className="relative shrink-0"
                                onMouseEnter={() => setOpenMenu(index)}
                                onMouseLeave={() => setOpenMenu(null)}
                            >
                                <button className="h-[38px] px-4 bg-[#f5f5f7] rounded-lg flex items-center gap-1.5 text-[13px] font-medium text-[#334155] whitespace-nowrap hover:bg-indigo-600 hover:text-white transition">
                                    {item.title}
                                    <IoChevronDownOutline className="text-[12px] shrink-0" />
                                </button>

                                {openMenu === index && (
                                    <div className="absolute top-[52px] left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
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

                    {/* View All Categories */}
                    <button className="shrink-0 h-[38px] px-5 rounded-full border-2 border-indigo-500 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-50 transition whitespace-nowrap flex items-center gap-1.5">
                        View All Categories
                        <span className="text-base">›</span>
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {mobileMenu && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileMenu(false)}
                    />

                    {/* Sidebar */}
                    <div className="relative w-[300px] max-w-[85vw] h-full bg-white p-6 shadow-xl overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <img
                                src={logo}
                                alt="Upleex"
                                className="w-32 object-contain"
                            />

                            <button
                                onClick={() => setMobileMenu(false)}
                                className="text-3xl text-gray-700"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <div className="w-full h-11 border border-gray-300 rounded-lg flex items-center px-4">
                                <CiSearch className="text-[22px] text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Menu Links */}
                        <div className="space-y-5 text-[16px] font-medium text-gray-700">
                            <button className="block w-full text-left hover:text-indigo-600">
                                Download App
                            </button>
                            <button className="block w-full text-left hover:text-indigo-600">
                                Plan
                            </button>
                            <button className="block w-full text-left hover:text-indigo-600">
                                Partner With Us
                            </button>
                            <button className="block w-full text-left hover:text-indigo-600">
                                Login / Sign Up
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                Categories
                            </h3>

                            <div className="space-y-3">
                                {categories.map((item, index) => (
                                    <div
                                        key={index}
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;