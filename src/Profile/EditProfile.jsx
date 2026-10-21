import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  User,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";

import Footer from "../Footer/Footer";
import { getProfile, updateProfile, syncStoredUser } from "./profileApi";

// Reuse the same field/input styling as the existing Register page.
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

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Load current user's existing information.
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const user = await getProfile();
        if (!isMounted) return;

        setName(user?.name || "");
        setEmail(user?.email || "");
        setPhoneNumber(user?.phoneNumber || "");
      } catch (err) {
        if (!isMounted) return;

        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to load your profile. Please try again.";

        setLoadError(message);
        toast.error(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      validationErrors.name = "Name must be at least 2 characters";
    }

    const emailValue = email.trim().toLowerCase();

    if (!emailValue) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const updatedUser = await updateProfile({
        name: name.trim(),
        email: emailValue,
        phoneNumber,
      });

      syncStoredUser(updatedUser);

      setName(updatedUser?.name || name.trim());
      setEmail(updatedUser?.email || emailValue);
      setPhoneNumber(updatedUser?.phoneNumber || phoneNumber);

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      const responseData = error?.response?.data;
      const serverErrors = responseData?.errors;

      if (serverErrors && typeof serverErrors === "object") {
        setErrors(serverErrors);
      }

      const message =
        responseData?.error ||
        responseData?.message ||
        error?.message ||
        "Something went wrong. Please try again later.";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-indigo-600 transition mb-6 cursor-pointer"
        >
          <ArrowLeft size={17} />
          Back to Profile
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
            <h1 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#081c4a]">
              Edit Profile
            </h1>

            <p className="mt-1.5 text-[13.5px] text-[#64748b]">
              Update your account details below.
            </p>
          </div>

          <div className="px-6 sm:px-8 py-7">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-500">
                <Loader2 size={22} className="animate-spin mr-2" />
                Loading your profile...
              </div>
            ) : loadError ? (
              <div className="py-12 text-center">
                <p className="text-[14px] text-red-500">{loadError}</p>

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="mt-5 px-5 py-2.5 rounded-xl border border-gray-200 text-[14px] font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Back to Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <Field label="Full Name" icon={User} error={errors.name}>
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
                      clearError("email");
                    }}
                  />
                </Field>

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

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-xl border border-gray-200 text-[14.5px] font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-xl text-white text-[14.5px] font-semibold bg-gradient-to-r from-[#5b4ffb] to-[#2cc7f0] shadow-[0_10px_25px_-8px_rgba(91,79,251,0.65)] hover:opacity-95 transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
