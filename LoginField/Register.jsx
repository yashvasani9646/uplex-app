import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  Zap,
  BadgeCheck,
  TrendingUp,
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

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#ef4444", "#f97316", "#3b82f6", "#22c55e"];

const getPasswordStrength = (value) => {
  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  return score;
};

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const strength = getPasswordStrength(password);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

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

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (phoneNumber.length !== 10) {
      validationErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }

    setErrors({});
    setLoading(true);

    const userData = { name, email, password, phoneNumber };

    try {
      const { data: emailCheck } = await axios.get(
        `${import.meta.env.VITE_API_URL}/check-email`,
        { params: { email } }
      );

      if (emailCheck.exists) {
        setErrors({ email: "This email is already registered" });
        toast.error("Email already exists. Try logging in instead.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.message) {
        toast.success("Registration successful! Taking you to login...");

        setTimeout(() => {
          navigate("/mainlogin");
        }, 1500);
      } else {
        toast.error(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors || {};

      setErrors(serverErrors);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f7fbff] to-[#eef7ff] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="relative w-full max-w-[1120px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_18px_50px_rgba(15,23,42,0.10)] border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-[42%_58%]">
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
              Start renting &amp;
              <br />
              selling in minutes.
            </h3>

            <p className="mt-4 text-[14px] xl:text-[15px] leading-relaxed text-gray-400 max-w-sm">
              Create your free account and unlock the whole Upleex marketplace
              built for India.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Zap size={19} className="text-[#58a6ff]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">
                    Free to Join
                  </h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    No listing fees, no hidden charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <BadgeCheck size={19} className="text-[#2ef7a0]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">
                    Verified Community
                  </h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    KYC-verified buyers and sellers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={19} className="text-[#d66cff]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">
                    Real Growth
                  </h4>
                  <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                    Grow your business across every city.
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
        <div className="px-5 sm:px-9 xl:px-11 py-7 sm:py-10 flex flex-col">
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
            Create Account
          </h1>

          <p className="mt-2 text-[13px] sm:text-[15px] text-[#64748b]">
            Fill in your details to get started on Upleex.
          </p>

          <form
            onSubmit={handelSubmit}
            className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
          >
            {/* Full Name */}
            <Field label="Full Name" icon={User} error={errors.name}>
              <input
                type="text"
                className={inputClass}
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
              />
            </Field>

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
                placeholder="Create a password"
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
                className="text-[#94a3b8] hover:text-[#5b4ffb] transition shrink-0"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </Field>

            {/* Password strength */}
            {password && (
              <div className="-mt-2 flex items-center gap-3">
                <div className="flex gap-1.5 flex-1">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor:
                          bar <= strength
                            ? strengthColors[strength]
                            : "#e8ecf3",
                      }}
                    />
                  ))}
                </div>

                <span
                  className="text-[12px] font-semibold"
                  style={{ color: strengthColors[strength] }}
                >
                  {strengthLabels[strength]}
                </span>
              </div>
            )}

            {/* Phone */}
            <Field label="Phone Number" icon={Phone} error={errors.phoneNumber}>
              <span className="text-[14px] font-medium text-[#475569] pr-2.5 border-r border-gray-200 shrink-0">
                +91
              </span>

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className={inputClass}
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);

                  setPhoneNumber(value);
                  setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
              />
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] sm:h-[52px] rounded-xl bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white text-[14px] sm:text-[16px] font-semibold shadow-lg shadow-[#5b4ffb]/25 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-xl transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-5 text-center">
              <p className="text-[13px] sm:text-[14px] text-[#64748b]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/mainlogin")}
                  className="font-semibold text-[#5b4ffb] hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;