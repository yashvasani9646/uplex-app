import { Heart, Loader2 } from "lucide-react";

const WishlistButton = ({
  active = false,
  loading = false,
  onClick,
  size = 18,
  className = "",
  activeClassName = "text-red-500",
  inactiveClassName = "text-gray-500",
  label,
}) => {
  const accessibleLabel =
    label || (active ? "Remove from wishlist" : "Add to wishlist");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-label={accessibleLabel}
      aria-pressed={active}
      title={accessibleLabel}
      className={`transition disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {loading ? (
        <Loader2 size={size} className="animate-spin" />
      ) : (
        <Heart
          size={size}
          className={`${active ? `${activeClassName} fill-current` : inactiveClassName} transition`}
        />
      )}
    </button>
  );
};

export default WishlistButton;
