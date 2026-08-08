import { useEffect, useState } from "react";

/**
 * Subscribes to a CSS media query from JS.
 *
 * Used where a decision cannot be expressed in CSS — for example choosing a
 * cheaper animation on phones, since the cost of a `filter: blur()` is not
 * something a Tailwind breakpoint can switch on its own.
 *
 * Starts `false` and resolves in an effect rather than reading `matchMedia`
 * during render, so the first paint is identical on every device and there is no
 * hydration mismatch if this is ever server-rendered.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};
