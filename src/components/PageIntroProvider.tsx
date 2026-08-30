import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { PageIntro } from "@/components/PageIntro";

/**
 * Which routes open behind a curtain, and in which colour.
 *
 * Exactly the five links in the navigation, and nothing else. A curtain is an arrival
 * moment; putting one in front of a deep link like `/portfolio-gallery`, a location
 * page or an article turns it into a toll on ordinary navigation.
 *
 * `/what-we-do` is `accent` because its header panel is orange, so the curtain
 * resolves straight into it. The rest use the page's own colour on an inverted
 * backdrop.
 */
const INTRO_ROUTES: Record<string, "theme" | "accent"> = {
  "/what-we-do": "accent",
  "/our-work": "theme",
  "/about-us": "theme",
  "/insights": "theme",
  "/contact": "theme",
};

/**
 * Whether the current page may start its entrance animations.
 *
 * Defaults to `true`, so any page rendered outside this provider — or on a route with
 * no curtain — animates normally instead of waiting forever for a handoff that will
 * never come.
 */
export const RevealContext = createContext(true);

/**
 * Owns the opening curtain for the whole app.
 *
 * ── Why this is not per-page ──
 *
 * The curtain used to be rendered inside each page. That put it *behind* the route's
 * code-splitting: every page except the landing page is `lazy()`, so React showed the
 * Suspense skeleton first, and only once the chunk arrived did the page mount and the
 * curtain begin. The visible result was skeleton, then curtain, then content — three
 * separate events where there should be one.
 *
 * Lifting it here fixes that by construction. This component is in the entry chunk
 * and sits above `Suspense`, so a route change starts the curtain on the same frame,
 * and the skeleton loads behind an opaque overlay. Nobody sees it unless the chunk
 * takes longer than the curtain, which is the correct behaviour rather than a bug.
 */
export const PageIntroProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const variant = INTRO_ROUTES[pathname];

  /* No curtain on this route means the page is free to animate immediately. */
  const [revealed, setRevealed] = useState(!variant);

  /*
    Reset on navigation. Without this, arriving at a second curtained route would find
    `revealed` already true from the previous one and the page's copy would be sitting
    there fully animated when the colour cleared.
  */
  useEffect(() => {
    setRevealed(!INTRO_ROUTES[pathname]);
  }, [pathname]);

  const handoff = useCallback(() => setRevealed(true), []);

  return (
    <RevealContext.Provider value={revealed}>
      {children}
      {variant && (
        /*
          Keyed on the path so it is a fresh mount per navigation, which restarts the
          sequence. Without the key React would reuse the instance and the timing
          effect would not re-run.
        */
        <PageIntro key={pathname} variant={variant} onHandoff={handoff} />
      )}
    </RevealContext.Provider>
  );
};
