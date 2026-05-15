
const blogs = [
    {
        image:
            "/Beuty.png",
        title: "Nemo in in molestias",
        desc: "Pariatur CupiditatePariatur CupiditatePariatur CupiditatePariatur CupiditatePariatur...",
    },
    {
        image:
            "/Dataimage.png",
        title: "What to Do With Appliances When You Move Cities",
        desc: "What to Do With Appliances When You Move Cities",
    },
    {
        image:
            "/RealEstate.png",
        title: "footwear",
        desc: "Discover the latest footwear trends in 2026, from stylish sneakers to comfortable everyday wear.",
    },
    {
        image:
            "/Vehical.png",

        title: "What is Lorem Ipsum?",
        desc: "What is Lorem Ipsum?",
    },
];

const LatestBlog = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 mt-16">

            {/* Top Heading */}
            <div className="relative flex items-center justify-center mb-14">

                <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
                    Latest Blogs
                </h1>

                <div className="absolute right-0">
                    <button className="h-14 px-10 border-2 border-indigo-500 text-indigo-500 rounded-full text-2xl font-medium hover:bg-indigo-50 transition-all duration-300">
                        View All
                    </button>
                </div>

            </div>

            <div className="grid grid-cols-4 gap-4">

                {blogs.map((item, index) => (
                    <div key={index} className="group cursor-pointer">

                        <div className="relative h-[320px] rounded-3xl overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                            <h2 className="absolute bottom-6 left-6 right-6 text-white text-[15px] font-semibold leading-tight">
                                {item.title}
                            </h2>
                        </div>

                        <h3 className="mt-6 text-[20px] font-bold text-[#0b1633] leading-tight group-hover:text-indigo-500 transition-all duration-300">
                            {item.title}
                        </h3>

                        <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
                            {item.desc}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default LatestBlog;