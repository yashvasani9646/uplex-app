import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";

import logo from "../src/assets/upleex-logo-dark.webp";

const Field = ({ label, icon: Icon, error, children }) => (
  <div>
    <label className="block text-[13px] sm:text-[14px] font-semibold text-[#0f172a] mb-2">
      {label} <span className="text-[#ef4444]">*</span>
    </label>

    <div
      className={`flex items-center gap-2.5 h-[46px] sm:h-[50px] px-4 rounded-xl border bg-white transition ${
        error
          ? "border-[#ef4444] ring-2 ring-[#ef4444]/10"
          : "border-gray-200 focus-within:border-[#5b4ffb] focus-within:ring-2 focus-within:ring-[#5b4ffb]/12"
      }`}
    >
      {Icon && <Icon size={17} className="text-[#94a3b8] shrink-0" />}

      {children}
    </div>

    {error && (
      <p className="mt-1.5 text-[12.5px] text-[#ef4444] flex items-center gap-1.5">
        <AlertCircle size={13} />
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  "w-full h-full bg-transparent text-[14px] sm:text-[15px] text-[#0f172a] outline-none placeholder:text-[#a8b2c4]";

const MainLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

      if (data.message) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("upleex:auth"));

        toast.success("Login successful. Redirecting to your dashboard...");

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setErrors(data.errors || {});
        setLoading(false);

        toast.error("Login failed. Please check your details.");
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors || {};

      setErrors(serverErrors);
      setLoading(false);

      if (serverErrors.email === "Email does not exist") {
        toast.error("No account found with this email");
      } else if (serverErrors.password === "Invalid Password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f7fbff] to-[#eef7ff] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="relative w-full max-w-[1080px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_18px_50px_rgba(15,23,42,0.10)] border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-[46%_54%]">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0]" />

        {/* ================= LEFT BRAND PANEL ================= */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#0b1633] text-white px-10 xl:px-12 py-12 overflow-hidden">
          <div className="absolute -top-28 -left-24 w-80 h-80 rounded-full bg-[#5b4ffb]/35 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#2cc7f0]/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#8b8cff] to-[#2cc7f0] bg-clip-text text-transparent">
                UPLEEX
              </span>
            </h2>

            <p className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-[#8b9ac0] uppercase">
              India's Rent Easy. List Fast.
            </p>
          </div>

          <div className="relative">
            <h3 className="text-[30px] xl:text-[34px] font-bold leading-tight">
              Welcome back to
              <br />
              your marketplace.
            </h3>

            <p className="mt-4 text-[14px] xl:text-[15px] leading-relaxed text-gray-400 max-w-sm">
              Sign in to track your rentals, manage your listings and discover
              thousands of products near you.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Tag size={19} className="text-[#58a6ff]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">Rent. Buy. List.</h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    One account for every category you love.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Truck size={19} className="text-[#2ef7a0]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">
                    Track Every Order
                  </h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    Live updates from booking to delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={19} className="text-[#d66cff]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">
                    Secure &amp; Private
                  </h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    Your data stays protected, always.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative text-[12.5px] text-gray-500">
            Trusted marketplace for renting &amp; selling.
          </p>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="px-5 sm:px-9 xl:px-12 py-7 sm:py-10 flex flex-col">
          {/* Mobile brand strip */}
          <div className="lg:hidden -mx-5 sm:-mx-9 xl:mx-0 mb-6 px-5 sm:px-9 py-5 bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80">
              Upleex
            </p>
            <p className="mt-1 text-[16px] font-bold leading-snug">
              India's Rent Easy. List Fast.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <img
              src={logo}
              alt="Upleex"
              className="h-10 sm:h-12 object-contain"
            />

            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="Back to home"
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#475569] hover:bg-gray-50 hover:border-[#5b4ffb]/40 hover:text-[#5b4ffb] transition"
            >
              <IoArrowBackSharp size={18} />
            </button>
          </div>

          <h1 className="mt-6 sm:mt-8 text-[24px] sm:text-[30px] font-extrabold text-[#081c4a]">
            Welcome Back
          </h1>

          <p className="mt-2 text-[13px] sm:text-[15px] text-[#64748b]">
            Login to your Upleex account to continue.
          </p>

          <form onSubmit={handelSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            {/* Email */}
            <Field label="Email Address" icon={Mail} error={errors.email}>
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </Field>

            {/* Password */}
            <Field label="Password" icon={Lock} error={errors.password}>
              <input
                type={showPassword ? "text" : "password"}
                className={`${inputClass} pr-2`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handelSubmit(e);
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[#94a3b8] hover:text-[#5b4ffb] transition shrink-0"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </Field>

            {/* Remember me / Forgot */}
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-[#5b4ffb] cursor-pointer"
                />
                <span className="text-[13px] sm:text-[14px] text-[#475569]">
                  Keep me logged in
                </span>
              </label>

              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "A password reset link has been sent to your email."
                  )
                }
                className="text-[13px] sm:text-[14px] font-semibold text-[#5b4ffb] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] sm:h-[52px] rounded-xl bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white text-[14px] sm:text-[16px] font-semibold shadow-lg shadow-[#5b4ffb]/25 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-xl transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Login
                </>
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-5 text-center">
              <p className="text-[13px] sm:text-[14px] text-[#64748b]">
                New to Upleex?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-semibold text-[#5b4ffb] hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;