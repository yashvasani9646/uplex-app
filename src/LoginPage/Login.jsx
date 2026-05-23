import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import Footer from "../Footer/Footer";

const Login = () => {

    const { t } = useTranslation();

    return (
        <>
            {/* Login Section */}
            <div className="w-full min-h-[calc(100vh-280px)] flex flex-col lg:flex-row">

                {/* Left Section */}
                <div
                    className="hidden lg:flex lg:w-1/2 min-h-[calc(100vh-280px)] relative items-center px-12"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, rgba(67,56,202,0.85), rgba(14,165,233,0.85)), url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-[480px] text-white">

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            {t("welcome_back")}
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/90">
                            {t("login_desc")}
                        </p>

                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 min-h-[calc(100vh-280px)] bg-[#f3f3f3] flex items-center justify-center px-4 sm:px-6 py-10 lg:py-0">

                    <div className="w-full max-w-[420px]">

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-8 sm:mb-10">
                            {t("sign_in")}
                        </h1>

                        {/* Mobile Number Input */}
                        <div className="h-12 bg-white border border-[#6366f1] rounded-lg flex items-center overflow-hidden mb-8 sm:mb-10">

                            <div className="px-4 flex items-center gap-2 border-r border-gray-200 text-gray-500">
                                <Phone size={16} />

                                <span className="text-sm font-medium">
                                    +91
                                </span>
                            </div>

                            <input
                                type="text"
                                placeholder={t("mobile_number")}
                                className="flex-1 px-4 h-full outline-none text-sm bg-transparent placeholder:text-gray-400"
                            />

                        </div>

                        {/* OTP Button */}
                        <button className="w-full h-12 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition cursor-pointer">
                            {t("send_otp")} →
                        </button>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Login;