export const WISHLIST_PREFIX = "upleex_wishlist_";
export const WISHLIST_EVENT = "upleex:wishlist";

export const getWishlistStorageId = () => {
  try {
    if (!localStorage.getItem("token")) return null;

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const identifier = user?.email || user?._id || user?.id || user?.userId;

    return identifier ? String(identifier).trim().toLowerCase() : null;
  } catch {
    return null;
  }
};

export const getWishlistStorageKey = () => {
  const identifier = getWishlistStorageId();

  return identifier
    ? `${WISHLIST_PREFIX}${encodeURIComponent(identifier)}`
    : null;
};

export const normalizeWishlistProduct = (product) => {
  const rawId = product?.id ?? product?._id ?? product?.productId;

  if (rawId == null || rawId === "") {
    throw new Error("Product ID is missing.");
  }

  return {
    id: String(rawId),
    name: product?.product || product?.name || "Product",
    price: Number(product?.price) || 0,
    image: product?.image || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    type: product?.type || "",
    available: product?.available,
  };
};

const normalizeWishlist = (items) => {
  if (!Array.isArray(items)) return [];

  const seen = new Set();

  return items.reduce((result, item) => {
    try {
      const normalized = normalizeWishlistProduct(item);

      if (seen.has(normalized.id)) return result;

      seen.add(normalized.id);
      result.push(normalized);
    } catch {
      // Ignore malformed entries instead of breaking the whole wishlist.
    }

    return result;
  }, []);
};

const readWishlistByKey = (key) => {
  if (!key) return [];

  try {
    return normalizeWishlist(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return [];
  }
};

const notifyWishlistChange = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(WISHLIST_EVENT));
};

const saveWishlist = (items) => {
  const key = getWishlistStorageKey();

  if (!key) {
    return { requiresAuth: true, items: [] };
  }

  const normalized = normalizeWishlist(items);
  localStorage.setItem(key, JSON.stringify(normalized));
  notifyWishlistChange();

  return { requiresAuth: false, items: normalized };
};

export const readWishlist = () => {
  return readWishlistByKey(getWishlistStorageKey());
};

export const getWishlistSnapshot = () => {
  const key = getWishlistStorageKey();

  if (!key) return "[]";

  try {
    return localStorage.getItem(key) || "[]";
  } catch {
    return "[]";
  }
};

export const parseWishlistSnapshot = (snapshot) => {
  try {
    return normalizeWishlist(JSON.parse(snapshot || "[]"));
  } catch {
    return [];
  }
};

export const subscribeWishlist = (callback) => {
  if (typeof window === "undefined") return () => {};

  const handleChange = (event) => {
    if (
      event.type === "storage" &&
      event.key &&
      !event.key.startsWith(WISHLIST_PREFIX) &&
      event.key !== "token" &&
      event.key !== "user"
    ) {
      return;
    }

    callback();
  };

  window.addEventListener(WISHLIST_EVENT, handleChange);
  window.addEventListener("upleex:auth", handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(WISHLIST_EVENT, handleChange);
    window.removeEventListener("upleex:auth", handleChange);
    window.removeEventListener("storage", handleChange);
  };
};

export const isProductWishlisted = (productId) => {
  if (productId == null) return false;

  return readWishlist().some((item) => item.id === String(productId));
};

export const addWishlistProduct = (product) => {
  const key = getWishlistStorageKey();

  if (!key) {
    return { requiresAuth: true, added: false, items: [] };
  }

  const normalized = normalizeWishlistProduct(product);
  const currentItems = readWishlistByKey(key);
  const exists = currentItems.some((item) => item.id === normalized.id);

  if (exists) {
    return { requiresAuth: false, added: false, alreadyExists: true, items: currentItems };
  }

  const result = saveWishlist([normalized, ...currentItems]);

  return { ...result, added: !result.requiresAuth, alreadyExists: false };
};

export const removeWishlistProduct = (productId) => {
  const key = getWishlistStorageKey();

  if (!key) {
    return { requiresAuth: true, removed: false, items: [] };
  }

  const id = String(productId);
  const currentItems = readWishlistByKey(key);
  const nextItems = currentItems.filter((item) => item.id !== id);
  const removed = nextItems.length !== currentItems.length;
  const result = saveWishlist(nextItems);

  return { ...result, removed };
};

export const toggleWishlistProduct = (product) => {
  const key = getWishlistStorageKey();

  if (!key) {
    return { requiresAuth: true, added: false, removed: false, items: [] };
  }

  const normalized = normalizeWishlistProduct(product);
  const currentItems = readWishlistByKey(key);
  const exists = currentItems.some((item) => item.id === normalized.id);

  if (exists) {
    const result = saveWishlist(
      currentItems.filter((item) => item.id !== normalized.id),
    );

    return {
      ...result,
      added: false,
      removed: !result.requiresAuth,
    };
  }

  const result = saveWishlist([normalized, ...currentItems]);

  return {
    ...result,
    added: !result.requiresAuth,
    removed: false,
    alreadyExists: false,
  };
};

export const mergeWishlistProduct = (savedProduct, latestProduct) => {
  if (!latestProduct) return savedProduct;

  try {
    const latest = normalizeWishlistProduct(latestProduct);

    return {
      ...savedProduct,
      ...latest,
      id: savedProduct.id,
    };
  } catch {
    return savedProduct;
  }
};
