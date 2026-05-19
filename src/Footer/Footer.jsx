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
    <footer className="w-full bg-[#06122d] ">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Logo Section */}
          <div>
            <img
              src="https://upleex.com/image/upleex-logo-light.jpg"
              alt="Upleex"
              className="h-10 sm:h-12 object-contain"
            />

            <p className="mt-5 text-sm sm:text-base lg:text-[17px] leading-relaxed text-slate-400 max-w-xs">
              Your local marketplace for renting and selling made simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-xl sm:text-2xl lg:text-[26px] font-semibold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3 text-sm sm:text-[15px] text-slate-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Categories
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Blog
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-white text-xl sm:text-2xl lg:text-[26px] font-semibold mb-5">
              Support
            </h2>

            <ul className="space-y-3 text-sm sm:text-[15px] text-slate-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                FAQ
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Terms of Use
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">
                Refund Policy
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-white text-xl sm:text-2xl lg:text-[26px] font-semibold mb-5">
              Stay Connected
            </h2>

            <div className="flex flex-wrap gap-4 text-white text-xl sm:text-2xl">
              <FaFacebookF className="cursor-pointer hover:text-sky-400 transition-colors duration-300" />
              <FaInstagram className="cursor-pointer hover:text-pink-400 transition-colors duration-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-400 transition-colors duration-300" />
              <FaLinkedinIn className="cursor-pointer hover:text-sky-500 transition-colors duration-300" />
              <FaYoutube className="cursor-pointer hover:text-red-500 transition-colors duration-300" />
            </div>

            <p className="mt-5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
              Subscribe to our newsletter for latest updates and offers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm sm:text-[15px] text-slate-500">
            © 2026 Upleex. All rights reserved.l
          </p>

          <p className="text-sm sm:text-[15px] text-slate-500 flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> for rent lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  