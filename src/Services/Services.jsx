import { FiShield, FiClock } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

const serviceCards = [
    {
        icon: <FiShield className="text-2xl sm:text-3xl text-sky-500" />,
        title: "Quality Checked",
        description:
            "We review listings to keep the platform safe and trusted.",
        bg: "bg-blue-50",
    },
    {
        icon: <FiClock className="text-2xl sm:text-3xl text-indigo-500" />,
        title: "Flexible Plans",
        description:
            "Choose a rental duration that fits your needs and budget.",
        bg: "bg-purple-50",
    },
    {
        icon: <FaHeartbeat className="text-2xl sm:text-3xl text-green-600" />,
        title: "Easy Support",
        description:
            "Get quick help for listings, rentals, and bookings.",
        bg: "bg-green-50",
    },
];

const Services = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">
            {/* Top Banner */}
            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Ready to upgrade your lifestyle?
                </h1>

                <p className="mt-4 sm:mt-5 text-base sm:text-xl lg:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed">
                    Join thousands of happy customers renting their favorite
                    products on <span className="font-semibold">Upleex.</span>
                </p>

                <button className="mt-8 sm:mt-10 h-11 sm:h-12 px-8 sm:px-12 lg:px-20 bg-white text-black font-semibold rounded-full hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300">
                    Explore Services
                </button>
            </div>

            {/* Service Cards */}
            <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 text-center">
                {serviceCards.map((card, index) => (
                    <div
                        key={index}
                        className="max-w-[320px] mx-auto hover:-translate-y-1 transition-all duration-300"
                    >
                        <div
                            className={`w-14 h-14 sm:w-[59px] sm:h-[59px] mx-auto rounded-[15px] ${card.bg} flex items-center justify-center`}
                        >
                            {card.icon}
                        </div>

                        <h2 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-bold text-[#0b1633]">
                            {card.title}
                        </h2>

                        <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-7 text-slate-500">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;