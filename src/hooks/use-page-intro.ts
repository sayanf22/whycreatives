import { useCallback, useState } from "react";

/**
 * Wiring for a page that opens behind `PageIntro`.
 *
 * `revealed` gates the page's own entrance animations. It exists because those
 * animations are driven by `whileInView`, and every one of these headers sits above
 * the fold — so without a gate they fire the moment the page mounts, run to
 * completion behind the curtain, and are already sitting there when the colour
 * clears.
 *
 * `handoff` is stable across renders. It is a dependency of the curtain's timing
 * effect, so a fresh function each render would tear down and restart the sequence
 * mid-animation.
 */
export const usePageIntro = () => {
  const [revealed, setRevealed] = useState(false);
  const handoff = useCallback(() => setRevealed(true), []);
  return { revealed, handoff };
};
