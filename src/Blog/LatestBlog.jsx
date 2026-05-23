import { useTranslation } from "react-i18next";

const LatestBlog = () => {

    const { t } = useTranslation();

    const blogs = [
        {
            image: "/frame2.png",
            title: t("blog_title_1"),
            desc: t("blog_desc_1"),
        },
        {
            image: "/frame3.png",
            title: t("blog_title_2"),
            desc: t("blog_desc_2"),
        },
        {
            image: "/frame4.png",
            title: t("blog_title_3"),
            desc: t("blog_desc_3"),
        },
        {
            image: "/frame2.png",
            title: t("blog_title_4"),
            desc: t("blog_desc_4"),
        },
    ];

    return (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20">

            {/* Header */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-6 sm:gap-0 mb-10 sm:mb-14">

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent leading-tight">
                    {t("latest_blogs")}
                </h1>

                <div className="sm:absolute sm:right-0 flex justify-center sm:justify-end">

                    <button className="h-10 sm:h-11 px-5 sm:px-7 border-2 border-indigo-500 text-indigo-500 rounded-full text-sm sm:text-base font-medium hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
                        {t("view_all")}
                    </button>

                </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {blogs.map((item, index) => (
                    <article
                        key={index}
                        className="group cursor-pointer"
                    >

                        {/* Image Card */}
                        <div className="relative h-[240px] sm:h-[280px] lg:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden">

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            <h2 className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white text-sm sm:text-[15px] font-semibold leading-tight">
                                {item.title}
                            </h2>

                        </div>

                        {/* Content */}
                        <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-bold text-[#0b1633] leading-tight group-hover:text-indigo-500 transition-colors duration-300">
                            {item.title}
                        </h3>

                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-slate-500 leading-relaxed">
                            {item.desc}
                        </p>

                    </article>
                ))}
            </div>
        </section>
    );
};

export default LatestBlog;