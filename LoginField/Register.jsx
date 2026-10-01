
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
import axios from "axios";

import logo from "../src/assets/upleex-logo-dark.webp";

// ================= FIELD COMPONENT =================

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
      {Icon && (
        <Icon size={17} className="text-[#94a3b8] shrink-0" />
      )}

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

// ================= INPUT CLASS =================

const inputClass =
  "w-full h-full min-w-0 bg-transparent text-[14px] sm:text-[15px] text-[#0f172a] outline-none placeholder:text-[#a8b2c4]";

// ================= PASSWORD STRENGTH =================

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

const strengthColors = [
  "",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
  "#22c55e",
];

const getPasswordStrength = (value) => {
  let score = 0;

  if (value.length >= 8) score++;

  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
    score++;
  }

  if (/\d/.test(value)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(value)) {
    score++;
  }

  return score;
};

// ================= FEATURES =================

const features = [
  {
    icon: Zap,
    color: "text-[#58a6ff]",
    title: "Free to Join",
    desc: "No listing fees, no hidden charges.",
  },
  {
    icon: BadgeCheck,
    color: "text-[#2ef7a0]",
    title: "Verified Community",
    desc: "KYC-verified buyers and sellers.",
  },
  {
    icon: TrendingUp,
    color: "text-[#d66cff]",
    title: "Real Growth",
    desc: "Grow your business across every city.",
  },
];

// ================= REGISTER =================

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= SCROLL TOP =================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  // ================= PASSWORD STRENGTH =================

  const strength = getPasswordStrength(password);

  // ================= CLEAR ERROR =================

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit
    if (loading) return;

    const validationErrors = {};

    // ---------- NAME ----------

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      validationErrors.name = "Name must be at least 2 characters";
    }

    // ---------- EMAIL ----------

    const emailValue = email.trim().toLowerCase();

    if (!emailValue) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      validationErrors.email = "Enter a valid email address";
    }

    // ---------- PASSWORD ----------

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password =
        "Password must be at least 8 characters";
    }

    // ---------- PHONE ----------

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      validationErrors.phoneNumber =
        "Enter a valid 10-digit phone number";
    }

    // ---------- VALIDATION FAILED ----------

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);


      return;
    }

    // ---------- CLEAR OLD ERRORS ----------

    setErrors({});
    setLoading(true);

    // ---------- USER DATA ----------

    const userData = {
      name: name.trim(),
      email: emailValue,
      password,
      phoneNumber,
    };

    try {
      // ==================================================
      // CHECK EMAIL
      // ==================================================

      const emailCheckResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/check-email`,
        {
          params: {
            email: emailValue,
          },
        }
      );

      const emailCheck = emailCheckResponse.data;

      // Email already exists
      if (emailCheck?.exists === true) {
        setErrors({
          email: "This email is already registered",
        });

        toast.error("Email already exists");

        setLoading(false);

        return;
      }

      // ==================================================
      // REGISTER USER
      // ==================================================

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // ==================================================
      // SUCCESS
      // ==================================================

      // Axios considers 2xx response successful.
      // Therefore we don't depend only on data.message.
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          data?.message || "Registration successful!"
        );

        setLoading(false);

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setErrors({});

        // Redirect to login
        setTimeout(() => {
          navigate("/mainlogin");
        }, 1500);

        return;
      }

      // ==================================================
      // UNEXPECTED RESPONSE
      // ==================================================

      setLoading(false);

      toast.error(
        data?.message ||
          "Registration failed. Please try again."
      );
    } catch (error) {
      console.error("Registration error:", error);

      setLoading(false);

      // ==================================================
      // SERVER VALIDATION ERRORS
      // ==================================================

      const responseData = error?.response?.data;

      const serverErrors = responseData?.errors;

      if (
        serverErrors &&
        typeof serverErrors === "object"
      ) {
        setErrors(serverErrors);
      }

      // ==================================================
      // SERVER MESSAGE
      // ==================================================

      const message =
        responseData?.message ||
        responseData?.error ||
        error?.message ||
        "Something went wrong. Please try again later.";

      toast.error(message);
    }
  };

  // ================= JSX =================

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f8fbff] to-[#edf6ff] px-3 sm:px-4 py-6 sm:py-10 flex justify-center">
      <div className="relative w-full max-w-[1120px] my-auto bg-white rounded-[26px] border border-gray-100 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.20)] overflow-hidden grid lg:grid-cols-[42%_58%]">

        {/* ================= TOP ACCENT ================= */}

        <div className="absolute top-0 inset-x-0 h-[6px] bg-gradient-to-r from-[#5b4ffb] via-[#7b6bff] to-[#2cc7f0] z-20" />

        {/* ================= MOBILE BRAND BAR ================= */}

        <div className="lg:hidden relative px-6 pt-8 pb-6 bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/80">
            Upleex
          </p>

          <p className="mt-1.5 text-[19px] font-bold leading-snug">
            India&apos;s Rent Easy. List Fast.
          </p>
        </div>

        {/* ================= LEFT BRAND PANEL ================= */}

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
              Start renting &
              <br />
              selling in minutes.
            </h3>

            <p className="mt-4 text-[14px] leading-relaxed text-gray-400 max-w-sm">
              Create your free account and unlock the whole
              Upleex marketplace built for India.
            </p>

            <div className="mt-9 space-y-5">
              {features.map(
                ({ icon: Icon, color, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon
                        size={19}
                        className={color}
                      />
                    </div>

                    <div>
                      <h4 className="text-[15px] font-semibold">
                        {title}
                      </h4>

                      <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <p className="relative text-[12.5px] text-gray-500">
            Trusted marketplace for renting & selling.
          </p>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}

        <div className="px-6 sm:px-10 xl:px-12 py-8 sm:py-12">

          {/* LOGO */}

          <div className="flex items-center justify-between gap-4">
            <img
              src={logo}
              alt="Upleex"
              className="h-10 sm:h-12 object-contain"
            />
          </div>

          {/* HEADING */}

          <h1 className="mt-7 text-[26px] sm:text-[30px] font-extrabold tracking-tight text-[#081c4a]">
            Create Account
          </h1>

          <p className="mt-2 text-[13.5px] sm:text-[15px] text-[#64748b]">
            Fill in your details to get started on Upleex.
          </p>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-7 sm:mt-8 space-y-5"
            noValidate
          >

            {/* ================= NAME ================= */}

            <Field
              label="Full Name"
              icon={User}
              error={errors.name}
            >
              <input
                type="text"
                name="name"
                autoComplete="name"
                className={inputClass}
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
              />
            </Field>

            {/* ================= EMAIL ================= */}

            <Field
              label="Email Address"
              icon={Mail}
              error={errors.email}
            >
              <input
                type="email"
                name="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
              />
            </Field>

            {/* ================= PASSWORD ================= */}

            <Field
              label="Password"
              icon={Lock}
              error={errors.password}
            >
              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                autoComplete="new-password"
                className={`${inputClass} pr-1`}
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="text-[#94a3b8] hover:text-[#5b4ffb] transition shrink-0 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </Field>

            {/* ================= PASSWORD STRENGTH ================= */}

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
                className="text-[12px] font-semibold min-w-[46px] text-right"
                style={{
                  color: strength
                    ? strengthColors[strength]
                    : "transparent",
                }}
              >
                {strength
                  ? strengthLabels[strength]
                  : ""}
              </span>
            </div>

            {/* ================= PHONE ================= */}

            <Field
              label="Phone Number"
              icon={Phone}
              error={errors.phoneNumber}
            >
              <span className="text-[14px] font-medium text-[#475569] pr-3 border-r border-gray-200 shrink-0">
                +91
              </span>

              <input
                type="tel"
                name="phoneNumber"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                className={inputClass}
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPhoneNumber(value);
                  clearError("phoneNumber");
                }}
              />
            </Field>

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] rounded-xl bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] text-white text-[15px] font-semibold shadow-[0_10px_25px_-8px_rgba(91,79,251,0.65)] flex items-center justify-center gap-2 hover:opacity-95 hover:shadow-[0_14px_30px_-8px_rgba(91,79,251,0.75)] transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* ================= LOGIN ================= */}

            <div className="relative pt-1 text-center">
              <div className="border-t border-gray-100" />

              <p className="mt-5 text-[13px] sm:text-[14px] text-[#64748b]">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/mainlogin")
                  }
                  className="font-semibold text-[#5b4ffb] hover:underline cursor-pointer"
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
