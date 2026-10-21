import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  User,
  Loader2,
  Pencil,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import Footer from "../Footer/Footer";
import { getProfile } from "./profileApi";

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-100 bg-white">
    <span className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
      <Icon size={19} />
    </span>

    <div className="min-w-0">
      <p className="text-[12.5px] font-medium text-gray-500">{label}</p>

      <p className="text-[15px] font-semibold text-[#0f172a] truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const user = await getProfile();
        if (isMounted) setProfile(user);
      } catch (err) {
        if (!isMounted) return;

        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to load your profile. Please try again.";

        setError(message);
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

  const initial = (profile?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-indigo-600 transition mb-6 cursor-pointer"
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden">
          {/* Header */}
          <div className="relative px-6 sm:px-8 py-8 bg-gradient-to-r from-indigo-500 to-sky-500 text-white">
            <div className="flex items-center gap-4">
              <span className="w-16 h-16 rounded-2xl bg-white/20 text-white text-[26px] font-bold flex items-center justify-center shrink-0">
                {initial}
              </span>

              <div className="min-w-0">
                <h1 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight truncate">
                  {profile?.name || "My Profile"}
                </h1>

                <p className="text-[13.5px] text-white/85 truncate">
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 sm:px-8 py-7">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-[16px] font-bold text-[#0f172a]">
                Account Information
              </h2>

              <button
                type="button"
                onClick={() => navigate("/profile/edit")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[14px] font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 hover:opacity-90 transition cursor-pointer"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-500">
                <Loader2 size={22} className="animate-spin mr-2" />
                Loading your profile...
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-[14px] text-red-500">{error}</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <InfoRow icon={User} label="Full Name" value={profile?.name} />

                <InfoRow
                  icon={Mail}
                  label="Email Address"
                  value={profile?.email}
                />

                <InfoRow
                  icon={Phone}
                  label="Phone Number"
                  value={profile?.phoneNumber}
                />
              </div>
            )}

            <div className="mt-7 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
              <ShieldCheck size={17} className="shrink-0" />
              <p className="text-[13px]">
                Your account information is private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
