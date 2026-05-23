import { useTranslation } from "react-i18next";

const Banner = () => {

  const { t } = useTranslation();

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  ];

  const sliderLogos = [...logos, ...logos, ...logos];

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-24 py-8 sm:py-10 lg:py-12 overflow-hidden">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
          {t("corporate_customers")}
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-[20px] text-slate-500 leading-relaxed">
          {t("corporate_desc")}
        </p>

      </div>

      {/* Logo Slider */}
      <div className="mt-10 sm:mt-12 lg:mt-14 overflow-hidden">

        <div className="flex w-max gap-4 sm:gap-6 lg:gap-8 animate-slide">

          {sliderLogos.map((logo, index) => (
            <div
              key={index}
              className="
                w-[160px] h-[90px]
                sm:w-[190px] sm:h-[100px]
                lg:w-[220px] lg:h-[110px]
                bg-white rounded-2xl shadow-md
                flex items-center justify-center
                shrink-0
                px-4 sm:px-6
              "
            >

              <img
                src={logo}
                alt="Company logo"
                className="max-h-8 sm:max-h-10 lg:max-h-12 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;