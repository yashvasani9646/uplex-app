import { FiShield, FiClock } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

const Services = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 mt-14">

            {/* Top Banner */}
            <div className="bg-slate-900 h-[350px] rounded-2xl flex flex-col items-center justify-center text-center px-6">

                <h1 className="text-5xl font-bold text-white">
                    Ready to upgrade your lifestyle?
                </h1>

                <p className="mt-5 text-2xl text-white font-light max-w-[900px] leading-relaxed">
                    Join thousands of happy customers renting their favorite products on{" "}
                    <span className="font-bold">Upleex.</span>
                </p>

                <button className="bg-white text-black font-semibold rounded-full mt-10 px-20 h-12 cursor-pointer hover:bg-gray-300 hover:-translate-y-1 transition-all duration-300 ">
                    Explore Services
                </button>

            </div>

            <div className="mt-20 grid grid-cols-3 gap-10 text-center max-w-[1500px] mx-auto">
                {/* Card 1 */}
                <div className="hover:-translate-y-1 transition-all duration-300 max-w-[320px] mx-auto">
                    <div className="w-[59px] h-[59px] mx-auto rounded-[15px] bg-blue-50 flex items-center justify-center">
                        <FiShield className="text-3xl text-sky-500" />
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-[#0b1633]">
                        Quality Checked
                    </h2>

                    <p className="mt-4 text-[15px] leading-7 text-slate-500">
                        We review listings to keep the platform safe and trusted.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="hover:-translate-y-1 transition-all duration-300 max-w-[320px] mx-auto">
                    <div className="w-[59px] h-[59px] mx-auto rounded-[15px] bg-purple-50 flex items-center justify-center">
                        <FiClock className="text-3xl text-indigo-500" />
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-[#0b1633]">
                        Flexible Plans
                    </h2>

                    <p className="mt-4 text-[15px] leading-7 text-slate-500">
                        Choose a rental duration that fits your needs and budget.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="hover:-translate-y-1 transition-all duration-300 max-w-[320px] mx-auto">
                    <div className="w-[59px] h-[59px] mx-auto rounded-[15px] bg-green-50 flex items-center justify-center">
                        <FaHeartbeat className="text-3xl text-green-600" />
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-[#0b1633]">
                        Easy Support
                    </h2>

                    <p className="mt-4 text-[15px] leading-7 text-slate-500">
                        Get quick help for listings, rentals, and bookings.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;