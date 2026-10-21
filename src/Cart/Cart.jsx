import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

const CART_PREFIX = "upleex_cart_";
const SAVED_PREFIX = "upleex_saved_";

// Build storage keys from the currently logged-in user's email (or ID fallback).
const getUserStorageId = () => {
  if (!localStorage.getItem("token")) return null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const identifier = user?.email || user?._id || user?.id || user?.userId;
    return identifier ? String(identifier).trim().toLowerCase() : null;
  } catch {
    return null;
  }
};

const getUserKey = (prefix) => {
  const userId = getUserStorageId();
  return userId ? `${prefix}${encodeURIComponent(userId)}` : null;
};

const readStore = (prefix) => {
  const key = getUserKey(prefix);
  if (!key) return [];

  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => readStore(CART_PREFIX));
  const [savedItems, setSavedItems] = useState(() => readStore(SAVED_PREFIX));
  const [isGift, setIsGift] = useState(false);

  // Save to the current user's own cart only. Do not delete that user's cart on logout.
  useEffect(() => {
    const key = getUserKey(CART_PREFIX);
    if (!key) {
      window.dispatchEvent(new Event("upleex:cart"));
      return;
    }

    localStorage.setItem(key, JSON.stringify(cartItems));
    window.dispatchEvent(new Event("upleex:cart"));
  }, [cartItems]);

  useEffect(() => {
    const key = getUserKey(SAVED_PREFIX);
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(savedItems));
  }, [savedItems]);

  // On login load that email's saved cart; on logout hide it without deleting it.
  useEffect(() => {
    const syncCartForAuth = () => {
      if (getUserStorageId()) {
        setCartItems(readStore(CART_PREFIX));
        setSavedItems(readStore(SAVED_PREFIX));
      } else {
        setCartItems([]);
        setSavedItems([]);
      }
      window.dispatchEvent(new Event("upleex:cart"));
    };

    window.addEventListener("upleex:auth", syncCartForAuth);
    window.addEventListener("storage", syncCartForAuth);
    syncCartForAuth();

    return () => {
      window.removeEventListener("upleex:auth", syncCartForAuth);
      window.removeEventListener("storage", syncCartForAuth);
    };
  }, []);

  // Set exact quantity
  const setItemQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Math.max(1, Math.min(99, Number(qty) || 1)),
            }
          : item,
      ),
    );
  };

  // Remove from cart
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => String(item.id) !== String(id)),
    );
  };

  // Move from cart -> saved for later
  const saveForLater = (id) => {
    const item = cartItems.find((i) => String(i.id) === String(id));
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => String(i.id) !== String(id)));

    setSavedItems((prev) =>
      prev.some((s) => String(s.id) === String(id)) ? prev : [...prev, item],
    );
  };

  // Move from saved -> cart
  const moveToCart = (id) => {
    const item = savedItems.find((s) => String(s.id) === String(id));
    if (!item) return;

    setSavedItems((prev) => prev.filter((s) => String(s.id) !== String(id)));

    setCartItems((prev) => {
      const existing = prev.find((i) => String(i.id) === String(id));

      if (existing) {
        return prev.map((i) =>
          String(i.id) === String(id)
            ? {
                ...i,
                quantity: Math.min(
                  99,
                  Number(i.quantity || 1) + Number(item.quantity || 1),
                ),
              }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  // Remove from saved
  const removeSaved = (id) => {
    setSavedItems((prev) => prev.filter((s) => String(s.id) !== String(id)));
  };

  // Totals
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const qtyOptions = [...Array(10)].map((_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        {/* Page heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md">
              <ShoppingCart size={22} />
            </span>

            <div>
              <h1 className="text-2xl font-bold text-[#0b1633] sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="text-xs text-gray-500 sm:text-sm">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#5b61ff] hover:bg-[#f5f2ff] hover:text-[#5b61ff]"
          >
            Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 && (
          /* Empty Cart */
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:py-16">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-sky-50">
              <ShoppingCart size={40} className="text-[#5b61ff]" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#0b1633]">
              Your Uplex cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Looks like you haven't added anything yet. Explore our latest
              products and start shopping.
            </p>

            <button
              onClick={() => navigate("/topcategory")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-7 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Start Shopping
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* Order Summary (top on mobile, right on desktop) */}
            <div className="order-1 w-full lg:order-2 lg:sticky lg:top-36">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-[15px] text-[#0b1633]">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                  ):{" "}
                  <span className="font-extrabold">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </h2>

                <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-[#5b61ff]"
                  />
                  This order contains a gift
                </label>

                <button
                  onClick={() => alert("Checkout will be added later.")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3.5 font-semibold text-white shadow-md transition hover:opacity-90"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={14} className="shrink-0 text-green-600" />
                  FREE delivery on this order
                </p>

                <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                  <ShieldCheck size={14} className="shrink-0 text-[#5b61ff]" />
                  100% Secure & Trusted Payments
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="order-2 min-w-0 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* List header (desktop) */}
                <div className="hidden items-center justify-between border-b border-gray-100 px-5 py-3 sm:flex">
                  <span className="text-sm font-medium text-gray-500">
                    Your items
                  </span>

                  <span className="text-sm font-medium text-gray-500">
                    Price
                  </span>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-100 px-4 py-4 last:border-b-0 sm:px-5 sm:py-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white sm:h-40 sm:w-40">
                        <img
                          src={item.image || "/RealEstate.png"}
                          alt={item.name || "Product"}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      {/* Info + Price */}
                      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-sm font-semibold text-[#0b1633] sm:text-base">
                            {item.name || "Product"}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-green-600 sm:text-sm">
                            In Stock
                          </p>

                          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            <span className="font-semibold text-[#0b1633]">
                              Sold by
                            </span>{" "}
                            Uplex
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                            <Truck
                              size={14}
                              className="shrink-0 text-[#5b61ff]"
                            />
                            FREE delivery
                          </p>

                          {/* Actions */}
                          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1.5 font-medium text-gray-500 transition hover:text-red-500 hover:underline"
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>

                            <span className="h-4 w-px bg-gray-300" />

                            <button
                              onClick={() => saveForLater(item.id)}
                              className="font-medium text-[#5b61ff] hover:underline"
                            >
                              Save for later
                            </button>
                          </div>
                        </div>

                        {/* Price + Qty */}
                        <div className="flex items-center justify-between gap-4 sm:w-[150px] sm:shrink-0 sm:flex-col sm:items-end sm:gap-2">
                          <span className="text-base font-bold text-[#0b1633] sm:text-lg">
                            ₹{Number(item.price || 0).toLocaleString("en-IN")}
                          </span>

                          <label className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Qty:</span>

                            <select
                              value={Number(item.quantity || 1)}
                              onChange={(e) =>
                                setItemQuantity(item.id, e.target.value)
                              }
                              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-sm font-semibold text-[#0b1633] outline-none transition hover:border-[#5b61ff] focus:border-[#5b61ff]"
                              aria-label="Quantity"
                            >
                              {qtyOptions.map((q) => (
                                <option key={q} value={q}>
                                  {q}
                                </option>
                              ))}

                              {Number(item.quantity || 1) > 10 && (
                                <option value={Number(item.quantity || 1)}>
                                  {Number(item.quantity || 1)}
                                </option>
                              )}
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subtotal footer */}
                <div className="flex justify-end border-t border-gray-100 px-5 py-4">
                  <p className="text-sm text-[#0b1633] sm:text-base">
                    Subtotal ({totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"}):{" "}
                    <span className="font-extrabold">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved for later */}
        {savedItems.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-base font-bold text-[#0b1633] sm:text-lg">
              Saved for later ({savedItems.length}{" "}
              {savedItems.length === 1 ? "item" : "items"})
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#f8fafc]">
                      <img
                        src={item.image || "/RealEstate.png"}
                        alt={item.name || "Product"}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-[#0b1633]">
                        {item.name || "Product"}
                      </h3>

                      <p className="mt-1 text-base font-bold text-[#0b1633]">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="font-medium text-[#5b61ff] hover:underline"
                        >
                          Move to cart
                        </button>

                        <button
                          onClick={() => removeSaved(item.id)}
                          className="text-gray-500 transition hover:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;