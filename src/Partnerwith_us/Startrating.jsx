import {
    User,
    Building2,
    Mail,
    MapPin,
    ShieldCheck,
    Zap,
    TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";

const Startrating = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, []);

    return (
        <>
            <div className="bg-[#f3f4f6] flex items-start justify-center mt-[-90px] min-h-screen px-3 sm:px-4 py-4">
                <div className="w-full max-w-[1100px] bg-white rounded-[18px] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-[38%_62%]">

                    {/* LEFT SIDE */}
                    <div className="bg-[#16233d] text-white px-5 sm:px-7 lg:px-9 py-8 sm:py-10 flex flex-col justify-between">
                        <div>
                            <h1 className="text-[24px] sm:text-[26px] font-bold mb-6 sm:mb-8">
                                <span className="text-[#4d7cff]">Partner</span> Hub
                            </h1>

                            <h2 className="text-[34px] sm:text-[40px] lg:text-[46px] font-bold leading-tight mb-4">
                                Join PartnerHub
                            </h2>

                            <p className="text-[15px] sm:text-[16px] text-gray-300 leading-relaxed max-w-[320px]">
                                Start your journey with us and expand your business reach.
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-10 space-y-6">
                            {/* ITEM */}
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                    <Zap className="text-[#58a6ff]" size={20} />
                                </div>

                                <div>
                                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-white">
                                        Instant Activation
                                    </h3>

                                    <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mt-1">
                                        Get your account approved quickly
                                    </p>
                                </div>
                            </div>

                            {/* ITEM */}
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                    <TrendingUp className="text-[#2ef7a0]" size={20} />
                                </div>

                                <div>
                                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-white">
                                        Zero Commission
                                    </h3>

                                    <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mt-1 max-w-[260px]">
                                        Keep 100% of your earnings for first month
                                    </p>
                                </div>
                            </div>

                            {/* ITEM */}
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="text-[#d66cff]" size={20} />
                                </div>

                                <div>
                                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-white">
                                        Verified Partners
                                    </h3>

                                    <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mt-1">
                                        Join a trusted community
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="px-4 sm:px-5 lg:px-6 py-6 sm:py-8">
                        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#0f172a]">
                            Register as Partner
                        </h2>

                        <p className="text-gray-500 text-sm sm:text-base mt-2 mb-6">
                            Fill in the details to get started
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* FULL NAME */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>

                                <div className="h-[48px] border border-gray-300 rounded-lg px-3 flex items-center gap-2">
                                    <User className="text-gray-400" size={16} />

                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* BUSINESS NAME */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Business Name <span className="text-red-500">*</span>
                                </label>

                                <div className="h-[48px] border border-gray-300 rounded-lg px-3 flex items-center gap-2">
                                    <Building2 className="text-gray-400" size={16} />

                                    <input
                                        type="text"
                                        placeholder="My Business Ltd"
                                        className="w-full outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>

                            <div className="h-[48px] border border-gray-300 rounded-lg px-3 flex items-center gap-2">
                                <Mail className="text-gray-400" size={16} />

                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* MOBILE + ALT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>

                                <div className="h-[48px] border border-gray-300 rounded-lg flex items-center overflow-hidden">
                                    <div className="px-3 text-sm font-medium border-r h-full flex items-center">
                                        +91
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="9876543210"
                                        className="w-full px-3 outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Alternative Number
                                </label>

                                <div className="h-[48px] border border-gray-300 rounded-lg flex items-center overflow-hidden">
                                    <div className="px-3 text-sm font-medium border-r h-full flex items-center">
                                        +91
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Optional"
                                        className="w-full px-3 outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CITY */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold mb-2">
                                City / County <span className="text-red-500">*</span>
                            </label>

                            <div className="h-[48px] border border-gray-300 rounded-lg px-3 flex items-center gap-2">
                                <MapPin className="text-gray-400" size={16} />

                                <input
                                    type="text"
                                    placeholder="Ahmedabad, Gujarat"
                                    className="w-full outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button className="w-full h-[50px] mt-6 rounded-lg bg-gradient-to-r from-[#5d8dff] to-[#5f84ff] text-white text-sm sm:text-base font-semibold shadow-lg hover:scale-[1.01] duration-300">
                            Send OTP
                        </button>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            Already have an account?{" "}
                            <span className="text-[#4d7cff] font-semibold cursor-pointer">
                                Login here
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default Startrating;