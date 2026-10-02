// Navbar.jsx
import { useEffect, useRef, useState } from "react";
import logo from "../assets/upleex-logo-dark.webp";

import { CiLocationOn, CiSearch, CiMobile1, CiMenuFries } from "react-icons/ci";

import {
  IoChevronDownOutline,
  IoCloseOutline,
  IoLogOutOutline,
  IoGridOutline,
} from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [userMenu, setUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  const userMenuRef = useRef(null);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("upleex:auth", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("upleex:auth", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!userMenu) return;

    const closeMenu = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, [userMenu]);

  const isLoggedIn = Boolean(user);

  const userName = user?.name || user?.userName || user?.username || "Account";

  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setUserMenu(false);
    setMobileMenu(false);

    window.dispatchEvent(new Event("upleex:auth"));

    navigate("/home");
  };

  const categories = [
    {
      title: t("building"),
      submenu: [t("cement"), t("steel"), t("tiles"), t("paint")],
    },
    {
      title: t("toys"),
      submenu: [t("remote_cars"), t("dolls"), t("games"), t("puzzles")],
    },
    {
      title: t("luggage"),
      submenu: [t("suitcases"), t("backpacks"), t("travel_bags")],
    },
    {
      title: t("home_kitchen"),
      submenu: [t("cookware"), t("furniture"), t("decor")],
    },
    {
      title: t("jewellery"),
      submenu: [t("necklaces"), t("rings"), t("bracelets")],
    },
    {
      title: t("fashion"),
      submenu: [t("clothing"), t("shoes"), t("accessories")],
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="h-[72px] flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4 lg:gap-8 flex-1 min-w-0">
            {/* Logo */}
            <img
              src={logo}
              alt="Upleex"
              className="w-[130px] sm:w-[150px] lg:w-[170px] object-contain shrink-0 cursor-pointer"
            />

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-[650px] h-[45px] border border-gray-300 bg-white overflow-hidden rounded-lg">
              {/* City Selector */}
              <div className="w-[210px] px-4 flex items-center gap-3 border-r border-gray-300 text-gray-700 shrink-0">
                <CiLocationOn className="text-[22px] text-indigo-500" />

                <span className="text-[15px] font-medium">
                  {t("select_city")}
                </span>

                <IoChevronDownOutline className="ml-auto text-gray-400 text-sm" />
              </div>

              {/* Search Input */}
              <div className="flex-1 px-5 flex items-center">
                <input
                  type="text"
                  placeholder={t("search_electronics")}
                  className="w-full bg-transparent outline-none text-[15px] text-gray-700 placeholder:text-gray-400"
                />

                <CiSearch className="text-[26px] text-gray-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden lg:flex items-center text-[14px] font-medium text-gray-700 shrink-0">
            <button className="flex items-center gap-2 px-4 border-r border-gray-300 hover:text-indigo-600 transition cursor-pointer">
              <CiMobile1 className="text-[20px]" />

              {t("download_app")}
            </button>

            <button className="px-4 border-r border-gray-300 hover:text-indigo-600 transition cursor-pointer">
              {t("plan")}
            </button>

            <button
              onClick={() => navigate("/partner")}
              className="px-4 border-r border-gray-300 hover:text-indigo-600 transition whitespace-nowrap cursor-pointer"
            >
              {t("partner")}
            </button>

            {isLoggedIn ? (
              /* ---------- USER CHIP + LOGOUT ---------- */
              <div className="relative ml-4" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenu((prev) => !prev)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[15px] font-bold flex items-center justify-center shrink-0">
                    {userInitial}
                  </span>

                  <span className="hidden xl:block text-left leading-tight max-w-[130px]">
                    <span className="block text-[13px] font-semibold text-[#0f172a] truncate">
                      {userName}
                    </span>

                    <span className="block text-[11px] text-gray-500 truncate">
                      {user?.email}
                    </span>
                  </span>

                  <IoChevronDownOutline
                    className={`text-[14px] text-gray-400 transition duration-300 ${
                      userMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-[9999]">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-indigo-50 to-sky-50">
                      <span className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[17px] font-bold flex items-center justify-center shrink-0">
                        {userInitial}
                      </span>

                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#0f172a] truncate">
                          {userName}
                        </p>

                        <p className="text-[12px] text-gray-500 truncate">
                          {user?.email || user?.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          setUserMenu(false);
                          navigate("/home");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        <IoGridOutline className="text-[17px] text-indigo-500" />

                        {t("dashboard")}
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-red-500 hover:bg-red-50 transition cursor-pointer"
                      >
                        <IoLogOutOutline className="text-[17px]" />

                        {t("logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="ml-4 px-5 xl:px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-lg hover:opacity-90 transition whitespace-nowrap cursor-pointer"
              >
                {t("login_signup")}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden text-3xl text-gray-700 shrink-0"
          >
            <CiMenuFries />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="w-full h-11 border border-gray-300 rounded-lg bg-white flex items-center px-4">
            <CiSearch className="text-[22px] text-gray-400 mr-2" />

            <input
              type="text"
              placeholder={t("search")}
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden lg:flex items-center justify-between pb-3 gap-4 relative z-[999] ">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-visible ">
            {categories.map((item, index) => (
              <div
                key={index}
                className="relative shrink-0 cursor-pointer"
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {/* Category Button */}
                <button
                  type="button"
                  className="h-[38px] px-4 bg-[#f5f5f7] rounded-lg flex items-center gap-1.5 text-[13px] font-medium text-[#334155] whitespace-nowrap hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                >
                  {item.title}

                  <IoChevronDownOutline className="text-[12px] shrink-0" />
                </button>

                {/* Dropdown */}
                {openMenu === index && (
                  <div
                    className="absolute left-0 top-full pt-2 w-64 z-[9999]"
                    onMouseEnter={() => setOpenMenu(index)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-2">
                      {item.submenu.map((sub, i) => (
                        <button
                          key={i}
                          type="button"
                          className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View All Categories */}
          <button
            type="button"
            className="shrink-0 h-[38px] px-5 rounded-full border-2 border-indigo-500 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-50 transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            {t("view_categories")}

            <span className="text-base">›</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenu(false)}
          />

          {/* Sidebar */}
          <div className="relative w-[300px] max-w-[85vw] h-full bg-white p-6 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <img src={logo} alt="Upleex" className="w-32 object-contain" />

              <button
                onClick={() => setMobileMenu(false)}
                className="text-3xl text-gray-700"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="w-full h-11 border border-gray-300 rounded-lg flex items-center px-4">
                <CiSearch className="text-[22px] text-gray-400 mr-2" />

                <input
                  type="text"
                  placeholder={t("search")}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Menu Links */}
            <div className="space-y-5 text-[16px] font-medium text-gray-700">
              {isLoggedIn && (
                <div className="flex items-center gap-3 pb-5 mb-1 border-b border-gray-200">
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[17px] font-bold flex items-center justify-center shrink-0">
                    {userInitial}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-[#0f172a] truncate">
                      {userName}
                    </p>

                    <p className="text-[13px] text-gray-500 truncate">
                      {user?.email || user?.phoneNumber}
                    </p>
                  </div>
                </div>
              )}

              <button className="block w-full text-left hover:text-indigo-600">
                {t("download_app")}
              </button>

              <button className="block w-full text-left hover:text-indigo-600">
                {t("plan")}
              </button>

              <button
                onClick={() => {
                  navigate("/partner");
                  setMobileMenu(false);
                }}
                className="block w-full text-left hover:text-indigo-600"
              >
                {t("partner")}
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/home");
                      setMobileMenu(false);
                    }}
                    className="block w-full text-left hover:text-indigo-600"
                  >
                    {t("dashboard")}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:text-red-600 flex items-center gap-2.5"
                  >
                    <IoLogOutOutline className="text-[18px]" />

                    {t("logout")}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/mainlogin");
                    setMobileMenu(false);
                  }}
                  className="block w-full text-left hover:text-indigo-600"
                >
                  {t("login_signup")}
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                {t("categories")}
              </h3>

              <div className="space-y-3">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* CATEGORY BUTTON */}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-white"
                    >
                      {item.title}

                      <IoChevronDownOutline
                        className={`transition duration-300 ${
                          openMenu === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* SUBMENU */}
                    {openMenu === index && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {item.submenu.map((sub, i) => (
                          <button
                            key={i}
                            className="block w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
