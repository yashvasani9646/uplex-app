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
import axios from "axios";

import logo from "../src/assets/upleex-logo-dark.webp";

const Field = ({ label, icon: Icon, error, children }) => (
  <div>
    <label className="block text-[13px] sm:text-[14px] font-semibold text-[#0f172a] mb-2">
      {label} <span className="text-[#ef4444]">*</span>
    </label>

    <div
      className={`flex items-center gap-2.5 h-[48px] px-4 rounded-xl border bg-white transition ${
        error
          ? "border-[#ef4444] ring-4 ring-[#ef4444]/10"
          : "border-gray-200 focus-within:border-[#5b4ffb] focus-within:ring-4 focus-within:ring-[#5b4ffb]/10"
      }`}
    >
      {Icon && <Icon size={17} className="text-[#94a3b8] shrink-0" />}

      {children}
    </div>

    {error && (
      <p className="mt-2 text-[12.5px] text-[#ef4444] flex items-center gap-1.5">
        <AlertCircle size={13} className="shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  "w-full h-full min-w-0 bg-transparent text-[14px] sm:text-[15px] text-[#0f172a] outline-none placeholder:text-[#a8b2c4]";

const features = [
  {
    icon: Tag,
    color: "text-[#58a6ff]",
    title: "Rent. Buy. List.",
    desc: "One account for every category you love.",
  },
  {
    icon: Truck,
    color: "text-[#2ef7a0]",
    title: "Track Every Order",
    desc: "Live updates from booking to delivery.",
  },
  {
    icon: ShieldCheck,
    color: "text-[#d66cff]",
    title: "Secure & Private",
    desc: "Your data stays protected, always.",
  },
];

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { headers: { "Content-type": "application/json" } },
      );

      if (data.message) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("upleex:auth"));

        toast.success("Login successfull");

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
            "Something went wrong. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f8fbff] to-[#edf6ff] px-3 sm:px-4 py-6 sm:py-10 flex justify-center">
      <div className="relative w-full max-w-[1080px] my-auto bg-white rounded-[26px] border border-gray-100 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.20)] overflow-hidden grid lg:grid-cols-[45%_55%]">
        {/* Top Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-[6px] bg-gradient-to-r from-[#5b4ffb] via-[#7b6bff] to-[#2cc7f0] z-20" />

        {/* ============ MOBILE BRAND BAR ============ */}
        <div className="lg:hidden relative px-6 pt-8 pb-6 bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/80">
            Upleex
          </p>

          <p className="mt-1.5 text-[19px] font-bold leading-snug">
            India&apos;s Rent Easy. List Fast.
          </p>
        </div>

        {/* ============ LEFT BRAND PANEL ============ */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#0b1633] text-white px-11 py-12 overflow-hidden">
          <div className="absolute -top-28 -left-24 w-80 h-80 rounded-full bg-[#5b4ffb]/35 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#2cc7f0]/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-[28px] font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#8b8cff] to-[#2cc7f0] bg-clip-text text-transparent">
                UPLEEX
              </span>
            </h2>

            <p className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-[#8b9ac0] uppercase">
              India&apos;s Rent Easy. List Fast.
            </p>
          </div>

          <div className="relative">
            <h3 className="text-[30px] font-bold leading-[1.15]">
              Welcome back to
              <br />
              your marketplace.
            </h3>

            <p className="mt-4 text-[14px] leading-relaxed text-gray-400 max-w-sm">
              Sign in to track your rentals, manage your listings and discover
              thousands of products near you.
            </p>

            <div className="mt-9 space-y-5">
              {features.map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={19} className={color} />
                  </div>

                  <div>
                    <h4 className="text-[15px] font-semibold">{title}</h4>

                    <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-[12.5px] text-gray-500">
            Trusted marketplace for renting &amp; selling.
          </p>
        </div>

        {/* ============ RIGHT FORM PANEL ============ */}
        <div className="px-6 sm:px-10 xl:px-14 py-8 sm:py-12">
          <div className="flex items-center justify-between gap-4">
            <img
              src={logo}
              alt="Upleex"
              className="h-10 sm:h-12 object-contain"
            />
          </div>

          <h1 className="mt-7 text-[26px] sm:text-[30px] font-extrabold tracking-tight text-[#081c4a]">
            Welcome Back
          </h1>

          <p className="mt-2 text-[13.5px] sm:text-[15px] text-[#64748b]">
            Login to your Upleex account to continue.
          </p>

          <form
            onSubmit={handelSubmit}
            className="mt-7 sm:mt-8 space-y-5"
            noValidate
          >
            {/* Email */}
            <Field label="Email Address" icon={Mail} error={errors.email}>
              <input
                type="email"
                name="email"
                autoComplete="email"
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
                name="password"
                autoComplete="current-password"
                className={`${inputClass} pr-1`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[#94a3b8] hover:text-[#5b4ffb] transition shrink-0 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </Field>

            {/* Remember me / Forgot */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="remember"
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
                    "A password reset link has been sent to your email.",
                  )
                }
                className="text-[13px] sm:text-[14px] font-semibold text-[#5b4ffb] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white text-[15px] font-semibold shadow-[0_10px_25px_-8px_rgba(91,79,251,0.65)] flex items-center justify-center gap-2 hover:opacity-95 hover:shadow-[0_14px_30px_-8px_rgba(91,79,251,0.75)] transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
            <div className="relative pt-1 text-center">
              <div className="border-t border-gray-100" />

              <p className="mt-5 text-[13px] sm:text-[14px] text-[#64748b]">
                New to Upleex?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-semibold text-[#5b4ffb] hover:underline cursor-pointer"
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
