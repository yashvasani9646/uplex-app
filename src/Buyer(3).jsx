import { FaArrowLeft } from "react-icons/fa6";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  HomeIcon,
  ShoppingCart,
  ArrowRight,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

const Buyer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const productId = new URLSearchParams(location.search).get("id");

  const [product, setProduct] = useState(location.state?.product || null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    location.state?.product?.image || "",
  );
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(!location.state?.product);
  // Reviews & Ratings
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [ratingBreakdown, setRatingBreakdown] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");

  // Fetch Product Reviews
  useEffect(() => {
    const loadReviews = async () => {
      if (!product?.id) return;

      setReviewsLoading(true);
      setReviewError("");

      try {
        const response = await axios.get(
          `${API_URL}/public/products/${encodeURIComponent(
            product.id,
          )}/reviews`,
        );

        setReviews(response.data.reviews || []);
        setAverageRating(response.data.averageRating || 0);

        setRatingBreakdown(
          response.data.ratingBreakdown || {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
          },
        );
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviewError("Unable to load reviews. Please try again.");
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [API_URL, product?.id]);
  // Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    setReviewMessage("");
    setReviewError("");

    if (!reviewName.trim()) {
      setReviewError("Please enter your name.");
      return;
    }

    if (!reviewRating) {
      setReviewError("Please select a rating between 1 and 5 stars.");
      return;
    }

    if (!reviewComment.trim()) {
      setReviewError("Please write your review.");
      return;
    }

    setReviewSubmitting(true);

    try {
      await axios.post(
        `${API_URL}/public/products/${encodeURIComponent(product.id)}/reviews`,
        {
          userName: reviewName.trim(),
          rating: reviewRating,
          comment: reviewComment.trim(),
        },
      );

      const response = await axios.get(
        `${API_URL}/public/products/${encodeURIComponent(product.id)}/reviews`,
      );

      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
      setRatingBreakdown(
        response.data.ratingBreakdown || {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      );

      setReviewName("");
      setReviewRating(0);
      setReviewComment("");

      setReviewMessage("Your review has been submitted successfully!");
    } catch (error) {
      console.error("Submit Review Error:", error);

      setReviewError(
        error.response?.data?.error ||
          "Unable to submit your review. Please try again.",
      );
    } finally {
      setReviewSubmitting(false);
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/public/products`);

        const foundProduct = response.data.find(
          (item) =>
            String(item.id ?? item._id ?? item.productId) === String(productId),
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.image || "");
        }
      } catch (error) {
        console.log("Product details error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [API_URL, productId]);

  const thumbnails = product?.image
    ? [
        product.image,
        product.image,
        product.image,
        product.image,
        product.image,
      ]
    : [];
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  const { t } = useTranslation();

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Product not found
            </h2>
            <p className="mt-2 text-gray-500">
              This product is not available right now.
            </p>
            <button
              onClick={() => navigate("/page1")}
              className="mt-5 px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-fit min-w-[110px] bg-gray-200 text-black px-4 py-2 rounded-full flex items-center justify-center gap-2 font-semibold border border-transparent hover:bg-gray-300 transition"
          >
            <FaArrowLeft size={14} />
            {t("back")}
          </button>

          {/* Main Card */}
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-visible shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT SIDE */}
              <div className="p-4 sm:p-6 lg:border-r border-gray-200 overflow-visible relative">
                <div className="relative w-full">
                  <div className="flex items-start gap-6">
                    {/* Main Image */}
                    <div
                      className="w-full max-w-[480px] h-[320px] sm:h-[400px] bg-white rounded-2xl shadow-md mx-auto flex justify-center items-start"
                      onMouseEnter={() => setShowZoom(true)}
                      onMouseLeave={() => setShowZoom(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="relative overflow-hidden cursor-crosshair w-full max-w-[300px] h-full">
                        <img
                          src={selectedImage || "/RealEstate.png"}
                          alt={product?.product || "Product"}
                          draggable={false}
                          className="w-full h-full object-cover object-top select-none pointer-events-none"
                        />
                      </div>
                    </div>

                    {showZoom && (
                      <div className="hidden xl:block absolute top-0 left-[calc(100%+24px)] w-[620px] h-[460px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-2xl z-50 pointer-events-none">
                        <div
                          className="w-full h-full bg-no-repeat"
                          style={{
                            backgroundImage: `url(${selectedImage})`,
                            backgroundSize: "220%", // video jaisa smooth zoom
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  {thumbnails.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition ${
                        selectedImage === img
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start gap-4 max-w-[620px]">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {product?.product || "Product"}
                  </h1>

                  <button className="w-10 h-10 rounded-full border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:shadow-md transition shrink-0">
                    <Heart size={20} />
                  </button>
                </div>

                <p className="inline-block text-sm text-blue-600 mt-2 font-medium px-3 py-1 rounded-2xl bg-sky-100">
                  {product?.category || "Category"}
                </p>

                <div className="mt-5 w-full max-w-[620px] min-h-[95px] border border-[#c7dbff] rounded-[14px] px-4 sm:px-5 py-4 bg-[#f8fbff] shadow-sm relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-[#eef4ff] rounded-full" />

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#19a7ff] rounded-full"></span>
                    <p className="text-[14px] font-semibold text-[#1797f2]">
                      {t("selling_price")}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-end gap-2 mt-2 flex-wrap">
                    <span className="text-2xl sm:text-[30px] leading-none font-extrabold text-[#081c4a]">
                      {product?.price ? `₹${product.price}` : "₹0"}
                    </span>

                    {product?.type && (
                      <span className="text-base sm:text-[16px] leading-none font-medium text-gray-500 mb-0.5">
                        {product.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 border border-black rounded-[14px] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white shadow-sm w-full max-w-[620px]">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#081c4a] leading-none">
                      {t("quantity")}
                    </h3>

                    <p className="text-[10px] text-gray-500 mt-1 leading-none">
                      {t("select_units")}
                    </p>

                    <p className="text-[10px] text-[#ff6b00] font-medium mt-1 leading-none">
                      {product?.available ? "Available" : "Not Available"}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 bg-[#f8f9fb] px-4 py-2 rounded-[10px] min-w-[130px] justify-center self-start sm:self-auto">
                    {/* Minus Button */}
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="text-gray-300 hover:text-blue-600 transition"
                    >
                      <Minus size={16} />
                    </button>

                    {/* Quantity */}
                    <span className="text-[15px] font-bold text-[#081c4a] min-w-[20px] text-center">
                      {quantity}
                    </span>

                    {/* Plus Button */}
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.min(99, prev + 1))
                      }
                      className="text-gray-500 hover:text-blue-600 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={() => {
                    try {
                      const rawProductId = product.id ?? product._id ?? product.productId;
                      if (rawProductId == null) {
                        toast.error("Product ID is missing. Please try again.");
                        return;
                      }

                      const pendingProduct = {
                        id: String(rawProductId),
                        name: product.product || product.name || "Product",
                        price: Number(product.price || 0),
                        image: product.image || "",
                        quantity: Math.min(99, Math.max(1, Number(quantity) || 1)),
                      };

                      const token = localStorage.getItem("token");
                      if (!token) {
                        localStorage.setItem("upleex_pending_product", JSON.stringify(pendingProduct));
                        toast.info("Please register or log in to add this product to your cart.");
                        navigate("/register");
                        return;
                      }

                      const user = JSON.parse(localStorage.getItem("user") || "{}");
                      const userIdentifier = user.email || user._id || user.id || user.userId;
                      if (!userIdentifier) {
                        toast.error("Please log in again to add products to your cart.");
                        return;
                      }

                      const cartKey = `upleex_cart_${encodeURIComponent(String(userIdentifier).trim().toLowerCase())}`;
                      const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
                      const existingProduct = savedCart.find((item) => String(item.id) === pendingProduct.id);

                      const updatedCart = existingProduct
                        ? savedCart.map((item) =>
                            String(item.id) === pendingProduct.id
                              ? { ...item, quantity: Math.min(99, Number(item.quantity || 1) + pendingProduct.quantity) }
                              : item,
                          )
                        : [...savedCart, pendingProduct];

                      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
                      window.dispatchEvent(new Event("upleex:cart"));
                      toast.success("Product added to cart!");
                      navigate("/cart", { replace: true });
                    } catch (error) {
                      console.error("Add to cart error:", error);
                      toast.error("Unable to add product to cart. Please try again.");
                    }
                  }}
                  className="mt-4 w-full max-w-[620px] py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 hover:shadow-lg transition flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} />
                  <span>{t("add_to_cart")}</span>
                  <ArrowRight size={18} />
                </button>

                {/* Seller Card */}
                <div className="mt-5 border border-transparent rounded-[16px] p-3 bg-white shadow-sm w-full max-w-[620px]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <HomeIcon size={20} className="text-sky-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-gray-500 font-bold">
                          {t("sold_by")}
                        </p>

                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mt-1">
                          {t("seller_name")}
                        </h3>

                        <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                          📍 {t("seller_location")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/shop")}
                      className="px-4 py-1.5 rounded-full border-2 border-indigo-500 text-indigo-600 text-[13px] font-semibold hover:bg-indigo-50 transition whitespace-nowrap self-start sm:self-auto"
                    >
                      {t("view_shop")}
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center w-full max-w-[620px]">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <ShieldCheck size={16} className="text-sky-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      ({t("kyc")})
                      <br />
                      {t("verified")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                      <ShieldCheck size={16} className="text-green-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      ({t("secure")})
                      <br />
                      {t("payment")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                      <Truck size={16} className="text-orange-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      ({t("verified")})
                      <br />
                      {t("product")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                      <RotateCcw size={16} className="text-purple-500" />
                    </div>
                    <p className="text-[12px] font-semibold text-gray-800 leading-4">
                      ({t("refund")})
                      <br />
                      {t("policy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs Section */}
            {/* Tabs Section */}
            <div className="mt-8 bg-white border border-gray-200 overflow-hidden shadow-sm">
              {/* Tabs Header */}
              <div className="border-b border-gray-200 flex overflow-x-auto px-4 sm:px-8 pt-3">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 pt-3 pb-1 text-[14px]  font-semibold leading-none transition ${
                    activeTab === "description"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("description")}
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-4 text-[14px] font-semibold transition ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("product_details")}
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-4 text-[14px] font-semibold transition ${
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {t("reviews_and_ratings")}
                </button>
              </div>

              <div className="bg-[#fafafa] text-gray-300 px-4 sm:px-9 py-6 sm:py-7 min-h-[140px]">
                {/* Description */}
                {activeTab === "description" && (
                  <div className="text-[15px] text-[#081c4a] whitespace-pre-wrap">
                    {product?.description ||
                      "No description available for this product."}
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="min-h-[300px] py-1 text-[#081c4a]">
                    {[
                      { label: "Design Motif", value: product?.designMotif },
                      {
                        label: "Centerpiece Stone",
                        value: product?.centerpieceStone,
                      },
                      { label: "Earring Style", value: product?.earringStyle },
                      {
                        label: "Embellishments",
                        value: product?.embellishments,
                      },
                      { label: "Finish", value: product?.finish },
                    ].map((detail, index, details) => (
                      <div
                        key={detail.label}
                        className={`grid grid-cols-1 sm:grid-cols-[minmax(180px,32%)_1fr] gap-2 sm:gap-6 py-4 ${
                          index !== details.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <p className="text-[15px] sm:text-base font-semibold text-black">
                          {detail.label}
                          {detail.label === "Design Motif" ? ":" : ""}
                        </p>
                        <p className="text-[15px] sm:text-base leading-relaxed text-[#334b6b] whitespace-pre-wrap break-words">
                          {detail.value || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    {/* Rating Summary */}
                    <div className="bg-[#eef4ff] rounded-2xl px-4 sm:px-6 py-4 border border-gray-100">
                      <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="text-center min-w-[120px]">
                          <h2 className="text-[48px] leading-none font-bold text-[#081c4a]">
                            {averageRating.toFixed(1)}
                          </h2>

                          <div className="flex justify-center gap-1 mt-1 text-yellow-400 text-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star}>
                                {star <= Math.round(averageRating) ? "★" : "☆"}
                              </span>
                            ))}
                          </div>

                          <p className="mt-1 text-[13px] text-gray-500">
                            {reviews.length} {t("zero_reviews")}
                          </p>
                        </div>

                        <div className="flex-1 w-full space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = Number(ratingBreakdown[star] || 0);
                            const percentage =
                              reviews.length > 0
                                ? (count / reviews.length) * 100
                                : 0;

                            return (
                              <div
                                key={star}
                                className="flex items-center gap-3"
                              >
                                <span className="w-3 text-sm text-gray-600">
                                  {star}
                                </span>
                                <span className="text-yellow-400 text-sm">
                                  ★
                                </span>

                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>

                                <span className="text-sm text-gray-500">
                                  {count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Write Review */}
                    <div className="mt-8 bg-white border border-gray-200 rounded-2xl px-4 sm:px-6 py-4">
                      <h3 className="text-[20px] font-bold text-[#081c4a]">
                        {t("write_a_review")}
                      </h3>

                      <form
                        onSubmit={handleReviewSubmit}
                        className="mt-5 space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                          </label>

                          <input
                            type="text"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Rating
                          </label>

                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className={`text-3xl transition ${
                                  star <= reviewRating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                aria-label={`Rate ${star} out of 5 stars`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                          </label>

                          <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Write your experience with this product..."
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
                          />
                        </div>

                        {reviewError && (
                          <p className="text-sm text-red-600">{reviewError}</p>
                        )}

                        {reviewMessage && (
                          <p className="text-sm text-green-600">
                            {reviewMessage}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={reviewSubmitting}
                          className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition disabled:opacity-50"
                        >
                          {reviewSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                      </form>
                    </div>

                    {/* Customer Reviews */}
                    <div className="mt-8">
                      <h3 className="text-[20px] font-bold text-[#081c4a]">
                        {t("customer_reviews")} ({reviews.length})
                      </h3>

                      {reviewsLoading ? (
                        <div className="mt-4 text-center py-6 text-gray-500">
                          Loading reviews...
                        </div>
                      ) : reviews.length === 0 ? (
                        <div className="mt-4 bg-gray-100 border border-gray-100 rounded-2xl py-6 text-center">
                          <div className="flex justify-center items-center text-gray-300">
                            <User size={48} strokeWidth={1.5} />
                          </div>

                          <p className="mt-2 text-[16px] text-gray-500">
                            {t("no_reviews_yet")}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 space-y-4">
                          {reviews.map((review) => (
                            <div
                              key={review._id}
                              className="bg-white border border-gray-200 rounded-2xl p-5"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <h4 className="font-semibold text-[#081c4a]">
                                    {review.userName}
                                  </h4>

                                  <div className="flex gap-1 mt-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span key={star}>
                                        {star <= review.rating ? "★" : "☆"}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <span className="text-sm text-gray-500">
                                  {review.createdAt
                                    ? new Date(
                                        review.createdAt,
                                      ).toLocaleDateString()
                                    : ""}
                                </span>
                              </div>

                              <p className="mt-3 text-gray-600 whitespace-pre-wrap">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}

          {/* Description / Product Details / Reviews Section */}

          <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
              <h2 className="text-[20px] font-bold text-[#081c4a]">
                {t("you_may_also_like")}
              </h2>
            </div>

            {/* Product Cards */}
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Product Card */}
                <div className="group cursor-pointer w-full max-w-[270px] mx-auto bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ">
                  {/* Image Section */}
                  <div className="relative p-3 pb-0">
                    {/* Sell Badge */}
                    <div className="absolute top-[8px] left-[-20px] w-[80px] bg-orange-500 text-white text-[10px] font-bold text-center py-1 rotate-[-45deg] shadow-md z-10">
                      {t("sell")}
                    </div>

                    {/* Wishlist Icon */}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm z-10 cursor-pointer">
                      <Heart size={16} className="text-gray-500" />
                    </button>

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="/images.jpg"
                        alt="48 PCS CAR CONTAINER"
                        className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Category + Price */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-white text-[#081c4a] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-sm">
                        {t("toys")}
                      </span>

                      <span className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[16px] font-bold px-3 py-1 rounded-full shadow-md">
                        {t("price", { amount: 599 })}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 pt-3">
                    {/* New Badge */}
                    <span className="inline-block bg-green-100 text-green-600 text-[10px] font-semibold px-2.5 py-1 rounded-md">
                      {t("new")}
                    </span>

                    {/* Product Title */}
                    <h3 className="mt-3 text-[14px] font-bold text-[#081c4a] leading-5 hover:text-blue-400">
                      {t("48_pcs_car_container")}
                    </h3>

                    {/* Location + Old Price */}
                    <div className="mt-2 flex items-center justify-between text-[12px]">
                      <span className="text-gray-500">📍 {t("surat")}</span>
                      <span className="text-gray-400 line-through">
                        {t("price", { amount: 1000 })}
                      </span>
                    </div>

                    {/* Buy Button */}
                    <button className="mt-4 w-full py-2.5 rounded-lg text-white text-[14px] font-semibold bg-gradient-to-r from-indigo-500 to-sky-500 shadow-md hover:opacity-90 transition cursor-pointer">
                      {t("buy_now")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Buyer;
