
const Banner = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-24 overflow-hidden">

      {/* Heading */}
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
        Our Corporate Customers
      </h1>

      <p className="text-center text-[20px] text-slate-500 mt-4">
        Trusted by leading companies and startups across the country
      </p>

      {/* Slider */}
      <div className="mt-14 overflow-hidden">

        <div className="flex w-max gap-8 animate-slide">

          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="w-[220px] h-[110px] bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 px-6"
            >
              <img
                src={logo}
                alt="logo"
                className="max-h-12 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Banner;