/**
 * Builds the hero panel's responsive WebP set from a single high-res source.
 *
 *   npm run hero
 *
 * Why a script rather than one exported file: the hero panel is a *landscape*
 * box on desktop and a *portrait* box on phones. Serving one landscape image to
 * both means the phone crops away most of the composition, so this emits two
 * separately-framed crops and the markup picks between them with <picture>.
 *
 * The portrait crop uses sharp's `attention` strategy, which centres the crop on
 * the highest-entropy region rather than the geometric middle — on this source
 * the bright content sits right of centre, so a plain centre crop would cut it.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
/*
  The source lives outside `public/` on purpose. Anything in `public/` is copied
  verbatim into `dist/`, so while the original sat in `public/assets/` every
  visitor was served a 1.4MB PNG that nothing on the site referenced. Keep
  masters in `design-source/` (git-ignored) and let this script emit the served
  files.
*/
const SOURCE_DIR = path.join(ROOT, "design-source");
const SOURCE = path.join(SOURCE_DIR, "hero-panel-source.png");
const OUT_DIR = path.join(ROOT, "public");

/** Generous, because this is the LCP image on every visit. */
const QUALITY = 78;

if (!fs.existsSync(SOURCE)) {
  console.error(`\nSource not found:\n  ${SOURCE}\n`);
  process.exit(1);
}

const meta = await sharp(SOURCE).metadata();
console.log(`\nsource: ${meta.width}x${meta.height} ${meta.format}`);

const kb = (n) => Math.round(n / 1024);
const written = [];

const emit = async (name, pipeline) => {
  const buf = await pipeline.webp({ quality: QUALITY, effort: 6 }).toBuffer();
  fs.writeFileSync(path.join(OUT_DIR, name), buf);
  const info = await sharp(buf).metadata();
  written.push({ name, w: info.width, h: info.height, size: buf.length });
};

/* ── LANDSCAPE ── desktop and tablet, native aspect, never upscaled. */
for (const width of [768, 1152, 1693]) {
  if (width > meta.width) continue;
  await emit(
    `hero-panel-${width}.webp`,
    sharp(SOURCE).resize({ width, withoutEnlargement: true }),
  );
}

/* ── PORTRAIT ── phones. 2:3 is about as tall as the source allows without
   upscaling: a 929px-tall frame gives 619px of width at that ratio. */
const PORTRAIT_RATIO = 2 / 3;
const nativePortraitWidth = Math.round(meta.height * PORTRAIT_RATIO);

for (const width of [420, nativePortraitWidth]) {
  await emit(
    `hero-panel-portrait-${width}.webp`,
    sharp(SOURCE).resize({
      width,
      height: Math.round(width / PORTRAIT_RATIO),
      fit: "cover",
      position: sharp.strategy.attention,
    }),
  );
}

console.log("");
for (const f of written) {
  console.log(
    `  ${f.name.padEnd(32)} ${`${f.w}x${f.h}`.padStart(10)}  ${String(kb(f.size)).padStart(4)}KB`,
  );
}
console.log(
  `\ntotal: ${kb(written.reduce((s, f) => s + f.size, 0))}KB from a ${kb(
    fs.statSync(SOURCE).size,
  )}KB source\n`,
);
