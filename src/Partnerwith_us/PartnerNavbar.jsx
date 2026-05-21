import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/upleex-logo-dark.webp";

const PartnerNavbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img
                            src={logo}
                            alt="Upleex"
                            className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        <a
                            href="#how-it-works"
                            className="text-[14px] lg:text-[15px] font-medium text-slate-600 hover:text-blue-600 transition"
                        >
                            How it works
                        </a>

                        <a
                            href="#benefits"
                            className="text-[14px] lg:text-[15px] font-medium text-slate-600 hover:text-blue-600 transition"
                        >
                            Benefits
                        </a>

                        <a
                            href="#categories"
                            className="text-[14px] lg:text-[15px] font-medium text-slate-600 hover:text-blue-600 transition"
                        >
                            Categories
                        </a>
                    </nav>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/signin"
                            className="px-4 lg:px-6 py-2.5 rounded-lg border border-gray-300 text-[14px] lg:text-[16px] font-semibold text-[#081c4a] hover:bg-gray-50 transition cursor-pointer hover:border-indigo-500 hover:text-indigo-500 whitespace-nowrap"
                        >
                            Login
                        </Link>

                        <button onClick={() => navigate("/Startrating")} className="px-4 lg:px-6 py-2.5 rounded-lg text-[14px] lg:text-[16px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition cursor-pointer whitespace-nowrap">
                            Start Renting
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden p-2 rounded-lg border border-gray-200"
                    >
                        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenu && (
                    <div className="md:hidden pb-6">
                        <nav className="flex flex-col gap-4 pt-4">

                            <a
                                href="#how-it-works"
                                className="text-[15px] font-medium text-slate-700 hover:text-blue-600"
                            >
                                How it works
                            </a>

                            <a
                                href="#benefits"
                                className="text-[15px] font-medium text-slate-700 hover:text-blue-600"
                            >
                                Benefits
                            </a>

                            <a
                                href="#categories"
                                className="text-[15px] font-medium text-slate-700 hover:text-blue-600"
                            >
                                Categories
                            </a>

                            <div className="flex flex-col gap-3 pt-4">
                                <Link
                                    to="/signin"
                                    className="w-full text-center px-5 py-3 rounded-lg border border-gray-300 text-[15px] font-semibold text-[#081c4a] hover:bg-gray-50 transition"
                                >
                                    Login
                                </Link>

                                <button className="w-full px-5 py-3 rounded-lg text-[15px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition">
                                    Start Renting
                                </button>
                            </div>

                        </nav>
                    </div>
                )}

            </div>
        </header>
    );
};

export default PartnerNavbar;