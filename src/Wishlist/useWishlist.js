import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  getWishlistSnapshot,
  getWishlistStorageId,
  parseWishlistSnapshot,
  removeWishlistProduct,
  subscribeWishlist,
  toggleWishlistProduct,
} from "./wishlistStore";

const getServerSnapshot = () => "[]";

export const useWishlist = () => {
  const snapshot = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerSnapshot,
  );

  const items = useMemo(() => parseWishlistSnapshot(snapshot), [snapshot]);

  const ids = useMemo(
    () => new Set(items.map((item) => String(item.id))),
    [items],
  );

  const userId = getWishlistStorageId();

  const isWishlisted = useCallback(
    (productId) => {
      if (productId == null) return false;
      return ids.has(String(productId));
    },
    [ids],
  );

  const toggle = useCallback(
    (product) => toggleWishlistProduct(product),
    [],
  );

  const remove = useCallback(
    (productId) => removeWishlistProduct(productId),
    [],
  );

  return {
    items,
    ids,
    userId,
    isWishlisted,
    toggle,
    remove,
  };
};
