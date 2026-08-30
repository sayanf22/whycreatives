import { useContext } from "react";
import { RevealContext } from "@/components/PageIntroProvider";

/**
 * Whether this page may start its entrance animations yet.
 *
 * Pages need this because their headers sit above the fold, so a `whileInView` reveal
 * fires the moment the page mounts — which on a curtained route means it runs to
 * completion behind the colour and is already sitting there when the curtain clears.
 * Gating on `revealed` starts the copy when the colour starts moving instead.
 *
 * Reads from context rather than owning state, because the curtain itself lives at
 * the app root: it has to sit above `Suspense` to cover the route skeleton, which is
 * higher up the tree than any page.
 *
 * On routes with no curtain this is `true` from the first render, so pages animate
 * normally and need no special case.
 */
export const usePageIntro = () => ({ revealed: useContext(RevealContext) });
