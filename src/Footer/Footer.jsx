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
    <footer className="w-full bg-[#06122d]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo Section */}
          <div>
            <img
              src="https://upleex.com/image/upleex-logo-light.jpg"
              alt="Upleex"
              className="h-12 object-contain"
            />

            <p className="mt-6 text-[14px] leading-7 text-slate-400 max-w-[280px]">
              Your local marketplace for renting and selling made simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-[18px] font-semibold mb-6">
              Quick Links
            </h2>

            <ul className="space-y-3 text-[14px] text-slate-400">
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Home
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                About Us
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Categories
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Blog
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-white text-[18px] font-semibold mb-6">
              Support
            </h2>

            <ul className="space-y-3 text-[14px] text-slate-400">
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                FAQ
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Contact Us
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Terms of Use
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:text-white transition-colors duration-300">
                Refund Policy
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h2 className="text-white text-[18px] font-semibold mb-6">
              Stay Connected
            </h2>

            <div className="flex items-center gap-4 text-white text-[20px]">
              <FaFacebookF className="cursor-pointer hover:text-blue-400 transition-colors duration-300" />
              <FaInstagram className="cursor-pointer hover:text-pink-400 transition-colors duration-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-400 transition-colors duration-300" />
              <FaLinkedinIn className="cursor-pointer hover:text-blue-500 transition-colors duration-300" />
              <FaYoutube className="cursor-pointer hover:text-red-500 transition-colors duration-300" />
            </div>

            <p className="mt-6 text-[13px] leading-6 text-slate-500 max-w-[300px]">
              Subscribe to our newsletter for latest updates and offers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-slate-500">
            © 2026 Upleex. All rights reserved.
          </p>

          <p className="text-[13px] text-slate-500 flex items-center gap-2">
            Made with <FaHeart className="text-red-500 text-[12px]" /> for rent
            lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;