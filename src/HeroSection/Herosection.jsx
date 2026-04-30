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

const Herosection = () => {
  return (
    <div className="w-full bg-gray-100 py-10 mt-[120px]">

      <div className="max-w-[1500px] mx-auto px-4">

        <div className="relative">

          {/* Left Arrow */}
          <button className="hero-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white text-3xl flex items-center justify-center shadow-md">
            <IoChevronBack />
          </button>

          {/* Right Arrow */}
          <button className="hero-next absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white text-3xl flex items-center justify-center shadow-md">
            <IoChevronForward />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              1024: {
                slidesPerView: 1.3,
              },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>

                <div className="relative h-[540px] rounded-3xl overflow-hidden shadow-xl">

                  <img
                    src={img}
                    alt="hero"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/45"></div>

                  {/* Text */}
                  <div className="absolute top-1/2 left-20 -translate-y-1/2 text-white max-w-[750px]">

                    <h1 className="text-6xl font-bold leading-tight">
                      India's Rent Easy. List Fast.
                      <br />
                      Earn Daily Marketplace
                    </h1>

                    <p className="mt-6 text-2xl text-gray-200">
                      Find products and services near you. Rent, buy, or list in
                      just a few simple steps.
                    </p>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </div>

    </div>
  );
};

export default Herosection;