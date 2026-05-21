import logo from "../assets/upleex-logo-dark.webp";

const Signin = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7ff] to-[#eef7ff] px-3 sm:px-4 py-4">

            <div className="w-full max-w-[430px] sm:max-w-[500px] bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_12px_40px_rgba(15,23,42,0.08)] overflow-hidden border border-gray-100">

                {/* Top Gradient Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0]"></div>

                <div className="px-5 sm:px-9 py-6 sm:py-7">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src={logo}
                            alt="Upleex"
                            className="h-10 sm:h-12 object-contain"
                        />
                    </div>

                    {/* Heading */}
                    <h2 className="mt-2 text-center text-[24px] sm:text-[32px] font-bold text-[#081c4a]">
                        Sign In
                    </h2>

                    <p className="mt-1.5 text-center text-[13px] sm:text-[15px] text-[#64748b] leading-6 px-2">
                        Enter your email and password to sign in!
                    </p>

                    {/* Input */}
                    <div className="mt-5 sm:mt-6">
                        <label className="text-[13px] sm:text-[14px] font-medium text-[#0f172a]">
                            Mobile <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter 10-digit mobile"
                            className="mt-2 w-full h-[46px] sm:h-[50px] rounded-xl border border-gray-200 px-4 text-[14px] sm:text-[15px] outline-none focus:border-blue-500 transition"
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="mt-4 flex items-center gap-2.5">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 shrink-0"
                        />

                        <p className="text-[13px] sm:text-[14px] text-[#475569]">
                            Keep me logged in
                        </p>
                    </div>

                    {/* Button */}
                    <button className="mt-5 w-full h-[46px] sm:h-[50px] rounded-xl bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white text-[14px] sm:text-[16px] font-semibold shadow-md hover:opacity-90 transition cursor-pointer">
                        Send OTP
                    </button>

                    {/* Divider */}
                    <div className="mt-5 border-t border-gray-100 pt-5 text-center">
                        <p className="text-[13px] sm:text-[14px] text-[#64748b]">
                            Don't have an account?{" "}
                            <span className="text-[#4f46e5] font-semibold cursor-pointer hover:underline">
                                Sign Up
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signin;