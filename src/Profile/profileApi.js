import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// The backend's JWT middleware reads the raw token from the
// "authorization" header (no "Bearer " prefix).
export const authHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { authorization: token } : {};
};

export const getProfile = async () => {
  const { data } = await axios.get(`${API_URL}/profile`, {
    headers: authHeaders(),
  });

  return data?.user || data;
};

export const updateProfile = async (payload) => {
  const { data } = await axios.put(`${API_URL}/profile`, payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
  });

  return data?.user || data;
};

// Persist the updated user into the existing auth state so the Navbar
// and other listeners pick up the new name/email immediately.
export const syncStoredUser = (updatedUser) => {
  if (!updatedUser) return;

  let current;

  try {
    current = JSON.parse(localStorage.getItem("user") || "null") || {};
  } catch {
    current = {};
  }

  const oldEmail = String(current.email || "").trim().toLowerCase();
  const newEmail = String(updatedUser.email || "").trim().toLowerCase();

  // The cart/saved-for-later storage is keyed by the user's email. If the
  // email changed we must move those keys so the cart follows the user
  // instead of appearing to be lost.
  if (oldEmail && newEmail && oldEmail !== newEmail) {
    const prefixes = ["upleex_cart_", "upleex_saved_"];

    prefixes.forEach((prefix) => {
      const oldKey = `${prefix}${encodeURIComponent(oldEmail)}`;
      const newKey = `${prefix}${encodeURIComponent(newEmail)}`;
      const value = localStorage.getItem(oldKey);

      if (value !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, value);
      }

      localStorage.removeItem(oldKey);
    });
  }

  const merged = {
    ...current,
    ...updatedUser,
  };

  localStorage.setItem("user", JSON.stringify(merged));
  window.dispatchEvent(new Event("upleex:auth"));
  window.dispatchEvent(new Event("upleex:cart"));
};
