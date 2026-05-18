import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import img1 from "../photo-1773098587088-f0a3aaab48a8.avif";
import img2 from "../photo-1774095120121-e2fcb529cc2b.avif";
import img3 from "../photo-1776549821469-e8aab812dba0.avif";
import img4 from "../premium_photo-1776981820574-8e9e3ba40109.avif";

const images = [img1, img2, img3, img4];
const sliderImages = [...images, ...images, ...images];

const Herosection = () => {
  return (
    <section className="w-full bg-gray-100 py-6 sm:py-8 lg:py-10 mt-2 cursor-pointer">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="relative">
          {/* Left Arrow */}
          <button
            className="
              hero-prev
              absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
              rounded-full bg-white text-xl sm:text-2xl lg:text-3xl
              flex items-center justify-center shadow-md
              hover:shadow-lg transition
            "
          >
            <IoChevronBack />
          </button>

          {/* Right Arrow */}
          <button
            className="
              hero-next
              absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
              rounded-full bg-white text-xl sm:text-2xl lg:text-3xl
              flex items-center justify-center shadow-md
              hover:shadow-lg transition
            "
          >
            <IoChevronForward />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            centeredSlides
            spaceBetween={0}
            loop
            speed={1000}
            watchSlidesProgress
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
              renderBullet: (index, className) => {
                if (index < 3) {
                  return `<span class="${className}"></span>`;
                }
                return "";
              },
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.05,
                spaceBetween: -30,
              },
              1024: {
                slidesPerView: 1.18,
                spaceBetween: -110,
              },
            }}
          >
            {sliderImages.map((img, index) => (
              <SwiperSlide key={index} className="group">
                <div className="px-1 sm:px-2 lg:px-4">
                  <div
                    className="
                      relative
                      h-[280px] sm:h-[380px] lg:h-[540px]
                      rounded-2xl sm:rounded-3xl
                      overflow-hidden shadow-2xl
                      transition-all duration-700 ease-in-out
                      scale-[0.94] opacity-50
                      group-[.swiper-slide-active]:scale-100
                      group-[.swiper-slide-active]:opacity-100
                    "
                  >
                    <img
                      src={img}
                      alt="hero"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/45" />

                    {/* Content */}
                    <div
                      className="
                        absolute inset-0
                        flex items-center
                        px-6 sm:px-10 lg:px-20
                      "
                    >
                      <div className="text-white max-w-4xl">
                        <h1
                          className="
                            text-2xl sm:text-4xl lg:text-6xl
                            font-bold leading-tight
                          "
                        >
                          India's Rent Easy. List Fast.
                          <br className="hidden sm:block" />
                          <span className="sm:hidden"> </span>
                          Earn Daily Marketplace
                        </h1>

                        <p
                          className="
                            mt-3 sm:mt-5 lg:mt-6
                            text-sm sm:text-lg lg:text-2xl
                            text-gray-200
                            leading-6 sm:leading-8 lg:leading-10
                            max-w-3xl
                          "
                        >
                          Find products and services near you. Rent, buy, or
                          list in just a few simple steps.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Herosection;