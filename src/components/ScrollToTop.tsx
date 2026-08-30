import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

/**
 * Resets scroll on navigation.
 *
 * Goes through Lenis rather than `window.scrollTo`. Lenis tracks its own animated
 * scroll position and eases the real one toward it, so a native jump moves the
 * document out from under it — Lenis then eases back toward the position it still
 * believes it is at, and the new page visibly slides away from the top.
 *
 * `immediate` because this is a page change, not a gesture: it should land at the top,
 * not glide there from wherever the last page was scrolled to.
 *
 * The fallback keeps this working if the provider is ever removed.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}
