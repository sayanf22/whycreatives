/**
 * The one accent colour on the site.
 *
 * Everything else is strictly monochrome — pure black and white, with colour
 * appearing only inside the `ProjectTextStage` phrases. So this is deliberately a
 * single named token rather than a hex literal sprinkled through the services page:
 * the intro curtain, the header panel and the scroll ribbon all have to be the
 * *same* orange or the sequence falls apart visually, and one constant is the only
 * way to guarantee that.
 */
export const ACCENT_ORANGE = "#FF6B42";

/**
 * The services pile, one colour per card.
 *
 * The exception to the note above, and a deliberate one: the cards sit in a physical
 * stack where two of them show only a strip of edge under the front one. A monochrome
 * pile cannot say which strip belongs to which card, so the colour is doing structural
 * work rather than decoration — it is the only thing that makes the depth legible.
 *
 * Ordered to match `SERVICES`. The first is the accent itself, so the pile opens on the
 * same orange as the page header above it and the sequence reads as continuous.
 *
 * All six are light enough to carry black type, and they keep it in both themes for the
 * same reason the header does: the card is this colour either way, so a token that
 * flipped to white would fail in one of them.
 *
 * Saturation is deliberately high. The first pass sat around 30-40% and read as dull
 * against the accent orange, which is fully saturated — a muted violet next to a hot
 * orange looks like a mistake rather than a palette. These are pushed up to sit with it.
 *
 * They are also all still light enough for the type on them to clear WCAG AA, which is
 * the ceiling on how far the saturation can go: the cards carry body copy, and more
 * saturation means a darker surface and less contrast under black text.
 */
export const SERVICE_CARD_COLOURS = [
  ACCENT_ORANGE, // Video
  "#9B8AFF", // Build
  "#FFB43D", // Brand
  "#4FD16B", // Growth
  "#5BB8E5", // Content
  "#FF8CA6", // Design
] as const;
