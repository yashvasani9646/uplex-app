import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Heart,
  Loader2,
  RefreshCw,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import Footer from "../Footer/Footer";
import { useWishlist } from "./useWishlist";
import { mergeWishlistProduct } from "./wishlistStore";
import WishlistButton from "./WishlistButton";

const API_URL = import.meta.env.VITE_API_URL;

const WishlistSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="h-56 animate-pulse bg-gray-100" />

        <div className="space-y-3 p-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

const Wishlist = () => {
  const navigate = useNavigate();
  const { items, userId, remove } = useWishlist();

  const [latestProducts, setLatestProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadLatestProducts = async () => {
      if (isActive) {
        setLoading(true);
        setError("");
      }

      try {
        const { data } = await axios.get(`${API_URL}/public/products`);
        const productMap = {};

        if (Array.isArray(data)) {
          data.forEach((product) => {
            const id = product?.id ?? product?._id ?? product?.productId;

            if (id != null) {
              productMap[String(id)] = product;
            }
          });
        }

        if (isActive) setLatestProducts(productMap);
      } catch (loadError) {
        console.error("Wishlist products error:", loadError);

        if (isActive) {
          setError(
            "We couldn't refresh the latest product details. Your saved items are still available.",
          );
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadLatestProducts();

    return () => {
      isActive = false;
    };
  }, [reloadToken, userId]);

  const displayItems = useMemo(
    () =>
      items.map((item) =>
        mergeWishlistProduct(item, latestProducts[String(item.id)]),
      ),
    [items, latestProducts],
  );

  const handleRemove = (product) => {
    setRemovingId(product.id);

    try {
      const result = remove(product.id);

      if (result.requiresAuth) {
        toast.info("Please log in to manage your wishlist.");
        navigate("/register");
        return;
      }

      toast.success("Removed from wishlist.");
    } catch (removeError) {
      console.error("Remove from wishlist error:", removeError);
      toast.error("Unable to remove this product. Please try again.");
    } finally {
      setRemovingId("");
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <Heart size={44} className="mx-auto text-gray-300" />

            <h1 className="mt-5 text-2xl font-bold text-[#0b1633]">
              Please log in to view your wishlist
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Your wishlist is linked to your account. Log in to see the
              products you have saved.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-7 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Login / Sign Up
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md">
              <Heart size={22} className="fill-current" />
            </span>

            <div>
              <h1 className="text-2xl font-bold text-[#0b1633] sm:text-3xl">
                My Wishlist
              </h1>

              <p className="text-xs text-gray-500 sm:text-sm">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#5b61ff] hover:bg-[#f5f2ff] hover:text-[#5b61ff]"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={() => navigate("/topcategory")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              <ShoppingBag size={16} />
              Continue Shopping
            </button>
          </div>
        </div>

        {error && items.length > 0 && (
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2">
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              {error}
            </p>

            <button
              onClick={() => setReloadToken((value) => value + 1)}
              className="inline-flex w-fit items-center gap-1.5 font-semibold text-amber-900 hover:underline"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {loading && items.length > 0 ? (
          <WishlistSkeleton />
        ) : displayItems.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:py-16">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-50 to-pink-50">
              <Heart size={40} className="text-rose-400" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#0b1633]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Tap the heart on any product to save it here for later.
            </p>

            <button
              onClick={() => navigate("/topcategory")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-7 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Explore Products
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative bg-[#f8fafc] p-4">
                  <WishlistButton
                    active
                    onClick={() => handleRemove(item)}
                    loading={removingId === item.id}
                    size={18}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:border-rose-200 hover:bg-rose-50"
                    label="Remove from wishlist"
                  />

                  <Link
                    to={`/Buyer?id=${encodeURIComponent(item.id)}`}
                    state={{ product: item }}
                    className="block"
                  >
                    <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-white">
                      <img
                        src={item.image || "/RealEstate.png"}
                        alt={item.name || "Product"}
                        className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {item.category && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#0b1633] shadow-sm">
                      {item.category}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-3 py-1 text-xs font-bold text-white shadow">
                    {`\u20B9${Number(item.price || 0).toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <Link
                    to={`/Buyer?id=${encodeURIComponent(item.id)}`}
                    state={{ product: item }}
                  >
                    <h3 className="line-clamp-2 text-[15px] font-semibold text-[#0b1633] transition group-hover:text-[#5b61ff]">
                      {item.name || "Product"}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-gray-500">
                    <span>{item.type || "Available"}</span>

                    <span
                      className={`font-medium ${
                        item.available === false
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.available === false ? "Unavailable" : "In stock"}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <Link
                      to={`/Buyer?id=${encodeURIComponent(item.id)}`}
                      state={{ product: item }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                    >
                      View Product
                      <ChevronRight size={15} />
                    </Link>

                    <button
                      onClick={() => handleRemove(item)}
                      disabled={removingId === item.id}
                      aria-label="Remove from wishlist"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-wait disabled:opacity-60"
                    >
                      {removingId === item.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
