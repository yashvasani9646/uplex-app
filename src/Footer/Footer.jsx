import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#06122d] mt-16">

      <div className="max-w-[1200px] mx-auto px-2 pt-12 pb-8">

        <div className="grid grid-cols-4 gap-8">

          {/* Logo Section */}
          <div>
            <img
              src="https://upleex.com/image/upleex-logo-light.jpg"
              alt="logo"
              className="h-12 object-contain"
            />

            <p className="text-slate-400 text-[17px] leading-relaxed mt-5">
              Your local marketplace for renting and selling made simple.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[26px] font-semibold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3 text-slate-400 text-[15px]">
              <li className="hover:text-white cursor-pointer duration-300">Home</li>
              <li className="hover:text-white cursor-pointer duration-300">About Us</li>
              <li className="hover:text-white cursor-pointer duration-300">Categories</li>
              <li className="hover:text-white cursor-pointer duration-300">Blog</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[26px] font-semibold mb-5">
              Support
            </h2>

            <ul className="space-y-3 text-slate-400 text-[15px]">
              <li className="hover:text-white cursor-pointer duration-300">FAQ</li>
              <li className="hover:text-white cursor-pointer duration-300">Contact Us</li>
              <li className="hover:text-white cursor-pointer duration-300">Terms of Use</li>
              <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer duration-300">Refund Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[26px] font-semibold mb-5">
              Stay Connected
            </h2>

            <div className="flex gap-4 text-white text-[24px]">
              <FaFacebookF className="cursor-pointer hover:text-sky-400 duration-300" />
              <FaInstagram className="cursor-pointer hover:text-pink-400 duration-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-400 duration-300" />
              <FaLinkedinIn className="cursor-pointer hover:text-sky-500 duration-300" />
              <FaYoutube className="cursor-pointer hover:text-red-500 duration-300" />
            </div>

            <p className="text-slate-500 text-[12px] leading-relaxed mt-5">
              Subscribe to our newsletter for latest updates and offers.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-5 flex justify-between items-center">

          <p className="text-slate-500 text-[15px]">
            © 2026 Upleex. All rights reserved.
          </p>

          <p className="text-slate-500 text-[15px] flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> for rent lovers
          </p>

        </div>

      </div>

    </div>
  );
};

export default Footer;