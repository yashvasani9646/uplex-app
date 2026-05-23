import {
    ArrowRight,
    CheckCircle,
    Shield,
    Wallet,
    TrendingUp,
    Play,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import Footer from "../Footer/Footer";

const PartnerWithus = () => {

    const { t } = useTranslation();

    const stats = [
        { value: "2,000+", label: t("active_partners") },
        { value: "5,000+", label: t("products_listed") },
        { value: "10,000+", label: t("orders_completed") },
        { value: "100+", label: t("cities_covered") },
    ];

    const features = [
        {
            icon: <Wallet size={22} className="text-blue-600" />,
            title: t("competitive_pricing"),
            description:
                t("competitive_pricing_desc"),
        },
        {
            icon: <Shield size={22} className="text-blue-600" />,
            title: t("secure_transactions"),
            description:
                t("secure_transactions_desc"),
        },
        {
            icon: <TrendingUp size={22} className="text-blue-600" />,
            title: t("growth_partner"),
            description:
                t("growth_partner_desc"),
        },
        {
            icon: <CheckCircle size={22} className="text-blue-600" />,
            title: t("ease_business"),
            points: [
                t("easy_product_listing"),
                t("real_time_order"),
                t("fast_payment"),
            ],
        },
    ];

    const testimonials = [
        {
            name: "Rajesh Kumar",
            role: t("construction_partner"),
            text:
                t("testimonial_1"),
        },
        {
            name: "Priya Sharma",
            role: t("electronics_partner"),
            text:
                t("testimonial_2"),
        },
        {
            name: "Amit Patel",
            role: t("event_manager"),
            text:
                t("testimonial_3"),
        },
    ];

    const steps = [
        {
            number: "1",
            title: t("create_account"),
            description: t("create_account_desc"),
        },
        {
            number: "2",
            title: t("list_products"),
            description: t("list_products_desc"),
            active: true,
        },
        {
            number: "3",
            title: t("get_orders"),
            description: t("get_orders_desc"),
        },
        {
            number: "4",
            title: t("manage_orders"),
            description: t("manage_orders_desc"),
        },
        {
            number: "5",
            title: t("receive_payments"),
            description: t("receive_payments_desc"),
        },
    ];

    const categories = [
        t("furniture"),
        t("electronics"),
        t("home_appliances"),
        t("event_equipment"),
        t("medical_equipment"),
        t("automobile"),
        t("musical_instruments"),
        t("tools_machinery"),
        t("generator"),
        t("and_more"),
    ];

    return (
        <>
            <div className="min-h-screen mt-[-45px]">

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-[650px] flex items-center py-20">
                    <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 w-full">

                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">

                            {/* Left Content */}
                            <div className="text-center lg:text-left">
                                <h1 className="text-[34px] sm:text-[48px] lg:text-[60px] font-bold leading-[1.1] text-[#0b1633]">
                                    {t("more_orders")}
                                    <br />
                                    {t("less_effort")}
                                    <br />

                                    <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
                                        {t("real_growth")}
                                    </span>
                                </h1>

                                <p className="mt-5 text-[16px] sm:text-[18px] leading-8 text-slate-600 max-w-[520px] mx-auto lg:mx-0">
                                    {t("partner_hero_desc")}
                                </p>

                                <button className="mt-7 inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-white text-[16px] font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-[0_12px_30px_rgba(59,130,246,0.25)] hover:opacity-90 transition cursor-pointer hover:-translate-y-1">
                                    {t("start_renting")}
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Hero Right Card */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-[600px] h-[260px] sm:h-[360px] lg:h-[440px] rounded-[32px] bg-gradient-to-br from-[#eef1ff] via-[#f6f7ff] to-[#eef4ff] shadow-[0_30px_80px_rgba(59,130,246,0.18)] overflow-hidden">

                                    <div className="absolute top-8 right-10 w-24 h-24 bg-blue-300/30 rounded-full blur-3xl"></div>

                                    <div className="absolute bottom-8 left-8 w-28 h-28 bg-yellow-100/60 rounded-full blur-3xl"></div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="text-[58px] sm:text-[90px] lg:text-[132px] font-extrabold tracking-tight text-[#dbe7ff] select-none">
                                            {t("partner")}
                                        </h2>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y border-gray-100 bg-white">
                    <div className="max-w-[1180px] mx-auto px-4 sm:px-8 lg:px-12 py-12">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center">
                            {stats.map((item, index) => (
                                <div key={index} className="px-2">
                                    <h3 className="text-2xl sm:text-4xl font-bold text-blue-500">
                                        {item.value}
                                    </h3>

                                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Why Partners Love Upleex */}
                <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">

                    <div className="max-w-[1370px] mx-auto px-4 sm:px-8 lg:px-16">

                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold text-blue-500">
                                {t("why_partner_love")}
                            </h1>

                            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                                {t("why_partner_desc")}
                            </p>
                        </div>

                        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                                >

                                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center hover:shadow-md transition-shadow">
                                        {feature.icon}
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    {feature.description && (
                                        <p className="mt-2 text-sm leading-7 text-gray-500">
                                            {feature.description}
                                        </p>
                                    )}

                                    {feature.points && (
                                        <ul className="mt-3 space-y-2">
                                            {feature.points.map((point, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2 text-sm text-gray-500"
                                                >
                                                    <CheckCircle
                                                        size={14}
                                                        className="text-green-500 shrink-0"
                                                    />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-white py-20">

                    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

                        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3b82f6] mb-16">
                            {t("partner_experience")}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {testimonials.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border border-gray-200 rounded-2xl px-6 sm:px-8 py-8 shadow-sm min-h-[220px] hover:shadow-2xl transition-all duration-300"
                                >

                                    <button className="absolute top-8 right-8 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#0ea5e9] group-hover:text-white transition-all duration-300">
                                        <Play
                                            size={16}
                                            className="sm:w-[18px] sm:h-[18px]"
                                            fill="currentColor"
                                        />
                                    </button>

                                    <h3 className="text-[20px] font-bold text-[#0b1633] leading-tight">
                                        {item.name}
                                    </h3>

                                    <p className="mt-1 text-[14px] text-[#64748b]">
                                        {item.role}
                                    </p>

                                    <p className="mt-6 text-[15px] sm:text-[17px] leading-8 text-[#334e75] max-w-full">
                                        "{item.text}"
                                    </p>

                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">

                    <div className="max-w-[1350px] mx-auto px-4 sm:px-8 lg:px-16">

                        <h2 className="text-center text-[24px] sm:text-[36px] font-bold text-[#3b82f6] mb-16">
                            {t("how_it_works")}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`relative bg-white border rounded-xl px-7 py-6 shadow-sm transition-all duration-300 ${step.active
                                        ? "border-blue-300 ring-2 ring-blue-100"
                                        : "border-gray-200"
                                        }`}
                                >

                                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] text-white text-[18px] font-bold flex items-center justify-center mx-auto shadow-md">
                                        {step.number}
                                    </div>

                                    <h3 className="mt-6 text-[18px] font-bold text-center text-[#0f172a]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-[14px] leading-7 text-center text-[#64748b]">
                                        {step.description}
                                    </p>

                                    {index === 0 && (
                                        <div className="mt-5 pt-4 border-t border-gray-100">

                                            <p className="text-[13px] font-semibold text-[#475569] mb-2">
                                                {t("all_you_need")}
                                            </p>

                                            <ul className="space-y-1.5 text-[13px] text-[#64748b]">

                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]"></span>
                                                    {t("business_details")}
                                                </li>

                                                <li className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]"></span>
                                                    {t("bank_account")}
                                                </li>

                                            </ul>
                                        </div>
                                    )}

                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="bg-white py-20">

                    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">

                        <h2 className="text-center text-[36px] sm:text-[48px] font-bold bg-gradient-to-r from-[#4f6df5] to-[#1da1f2] bg-clip-text text-transparent mb-14 leading-tight">
                            {t("popular_categories")}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1400px] mx-auto">

                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className="h-[62px] bg-white border border-gray-200 rounded-xl text-center hover:border-transparent hover:text-white hover:bg-gradient-to-r hover:from-[#6366f1] hover:to-[#00a5e9] transition-all duration-300 cursor-pointer font-medium text-slate-700 text-[17px] hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    {category}
                                </button>
                            ))}

                        </div>

                    </div>
                </section>

                {/* Support Section */}
                <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">

                    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">

                        <h2 className="text-4xl sm:text-5xl font-bold text-[#0b1633] leading-tight">
                            {t("support_247")}
                        </h2>

                        <p className="mt-6 text-lg sm:text-2xl text-gray-500 leading-8 sm:leading-[42px]">
                            {t("support_desc")}
                        </p>

                        <a
                            href="mailto:partnership@upleex.com"
                            className="inline-block mt-6 text-xl sm:text-2xl font-semibold text-blue-600 hover:underline"
                        >
                            partnership@upleex.com
                        </a>

                    </div>
                </section>

            </div>

            <Footer />
        </>
    );
};

export default PartnerWithus;