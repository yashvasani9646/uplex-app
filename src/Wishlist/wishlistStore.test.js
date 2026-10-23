import test from "node:test";
import assert from "node:assert/strict";

const storage = new Map();
const listeners = new Map();

globalThis.localStorage = {
  getItem(key) {
    return storage.has(String(key)) ? storage.get(String(key)) : null;
  },
  setItem(key, value) {
    storage.set(String(key), String(value));
  },
  removeItem(key) {
    storage.delete(String(key));
  },
  clear() {
    storage.clear();
  },
};

globalThis.window = {
  addEventListener(type, callback) {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(callback);
  },
  removeEventListener(type, callback) {
    listeners.get(type)?.delete(callback);
  },
  dispatchEvent(event) {
    listeners.get(event.type)?.forEach((callback) => callback(event));
    return true;
  },
};

const {
  getWishlistStorageKey,
  normalizeWishlistProduct,
  readWishlist,
  getWishlistSnapshot,
  parseWishlistSnapshot,
  addWishlistProduct,
  removeWishlistProduct,
  toggleWishlistProduct,
  mergeWishlistProduct,
} = await import(new URL("./wishlistStore.js", import.meta.url));

const login = (email) => {
  localStorage.setItem("token", `token-${email}`);
  localStorage.setItem("user", JSON.stringify({ email }));
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const product = (id, name, price = 100, image = "") => ({
  id,
  product: name,
  price,
  image,
  category: "toys",
  type: "Sell",
  available: true,
});

test.beforeEach(() => {
  storage.clear();
  logout();
});

test("requires authentication before saving a wishlist", () => {
  const result = toggleWishlistProduct(product(1, "Car"));

  assert.equal(result.requiresAuth, true);
  assert.equal(storage.size, 0);
});

test("adds, avoids duplicates, toggles and removes products", () => {
  login("User@Example.com");

  const first = toggleWishlistProduct(product(1, "Car"));
  assert.equal(first.requiresAuth, false);
  assert.equal(first.added, true);
  assert.equal(readWishlist().length, 1);

  const duplicate = addWishlistProduct(product(1, "Car"));
  assert.equal(duplicate.alreadyExists, true);
  assert.equal(readWishlist().length, 1);

  const secondToggle = toggleWishlistProduct(product(1, "Car"));
  assert.equal(secondToggle.added, false);
  assert.equal(secondToggle.removed, true);
  assert.equal(readWishlist().length, 0);

  addWishlistProduct(product(1, "Car"));
  addWishlistProduct(product(2, "Bike"));

  const removed = removeWishlistProduct("1");
  assert.equal(removed.removed, true);
  assert.deepEqual(
    readWishlist().map((item) => item.id),
    ["2"],
  );
});

test("keeps each user's wishlist separate and persistent", () => {
  login("a@example.com");
  addWishlistProduct(product(101, "A Product"));

  const keyA = getWishlistStorageKey();
  assert.equal(keyA, "upleex_wishlist_a%40example.com");

  login("b@example.com");
  assert.equal(readWishlist().length, 0);

  addWishlistProduct(product(202, "B Product"));
  assert.deepEqual(
    readWishlist().map((item) => item.id),
    ["202"],
  );

  logout();
  assert.equal(readWishlist().length, 0);

  login("A@EXAMPLE.COM");
  assert.deepEqual(
    readWishlist().map((item) => item.id),
    ["101"],
  );
  assert.equal(getWishlistStorageKey(), keyA);
});

test("snapshot parsing deduplicates and drops malformed entries", () => {
  const snapshot = JSON.stringify([
    product(1, "Car"),
    product(1, "Car duplicate"),
    { id: null },
    product(2, "Bike"),
    null,
  ]);

  assert.deepEqual(
    parseWishlistSnapshot(snapshot).map((item) => item.id),
    ["1", "2"],
  );
});

test("reads saved snapshot and merges refreshed product details", () => {
  login("snapshot@example.com");
  addWishlistProduct(product(5, "Old name", 100, "old.png"));

  const snapshot = getWishlistSnapshot();
  assert.equal(parseWishlistSnapshot(snapshot).length, 1);

  const merged = mergeWishlistProduct(readWishlist()[0], {
    id: 5,
    product: "New name",
    price: "250",
    image: "new.png",
    category: "furniture",
    available: false,
  });

  assert.equal(merged.id, "5");
  assert.equal(merged.name, "New name");
  assert.equal(merged.price, 250);
  assert.equal(merged.image, "new.png");
  assert.equal(merged.available, false);
});

test("normalizes missing/invalid product data", () => {
  assert.throws(() => normalizeWishlistProduct({ product: "No id" }));

  const normalized = normalizeWishlistProduct({
    _id: "mongo-id",
    name: "Fallback name",
    price: "not-a-number",
  });

  assert.equal(normalized.id, "mongo-id");
  assert.equal(normalized.name, "Fallback name");
  assert.equal(normalized.price, 0);
});
