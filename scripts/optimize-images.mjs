/**
 * Audits and compresses everything in public/.
 *
 *   npm run images        # report only
 *   npm run images:write  # compress + prune
 *
 * Rules:
 *  - referenced .webp  -> re-encoded, capped at MAX_WIDTH
 *  - logo/favicon .png -> kept as PNG (transparency / favicon support), squeezed
 *  - any other referenced .png/.jpg -> flagged, NOT silently rewritten. Writing
 *    WebP bytes into a .png filename serves the wrong Content-Type, so these
 *    need their source reference switched to the .webp twin instead.
 *  - unreferenced -> reported, and deleted with --write
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const WRITE = process.argv.includes("--write");

const MAX_WIDTH = 1600; // nothing on the site renders wider than this
const QUALITY = 72;
const KEEP_AS_PNG = new Set(["favicon.png", "logo.png"]);
const NEVER_DELETE = new Set(["favicon.png", "favicon.ico", "logo.png"]);

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
};

const sourceText = walk(path.join(ROOT, "src"))
  .filter((f) => /\.(tsx?|css)$/.test(f))
  .concat([path.join(ROOT, "index.html")])
  .map((f) => fs.readFileSync(f, "utf8"))
  .join("\n");

const kb = (n) => Math.round(n / 1024);
const images = walk(PUBLIC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

let before = 0;
let after = 0;
const unused = [];
const flagged = [];

for (const file of images) {
  const name = path.basename(file);
  const size = fs.statSync(file).size;

  if (!sourceText.includes(name) && !NEVER_DELETE.has(name)) {
    unused.push({ name, file, size });
    continue;
  }

  before += size;
  const ext = path.extname(file).toLowerCase();

  if (ext === ".webp") {
    if (WRITE) {
      // read into a buffer first: sharp keeps the source handle open, and
      // writing back to the same path while it's held fails on Windows
      const src = fs.readFileSync(file);
      const out = await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      if (out.length < size) fs.writeFileSync(file, out);
    }
  } else if (KEEP_AS_PNG.has(name)) {
    if (WRITE) {
      const src = fs.readFileSync(file);
      const out = await sharp(src)
        .resize({ width: 512, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
      if (out.length < size) fs.writeFileSync(file, out);
    }
  } else {
    flagged.push({ name, size });
  }

  after += fs.statSync(file).size;
}

if (WRITE) {
  for (const u of unused) fs.unlinkSync(u.file);
}

console.log(`\nreferenced: ${kb(before)}KB -> ${kb(after)}KB`);

if (flagged.length) {
  console.log(`\nreferenced but still raster PNG/JPG (switch source to .webp):`);
  for (const f of flagged) console.log(`  ${f.name.padEnd(28)} ${String(kb(f.size)).padStart(5)}KB`);
}

console.log(`\nunreferenced (${unused.length}), ${kb(unused.reduce((s, u) => s + u.size, 0))}KB:`);
for (const u of unused) console.log(`  ${u.name.padEnd(28)} ${String(kb(u.size)).padStart(5)}KB`);
console.log(WRITE ? "\napplied.\n" : "\ndry run — pass --write to apply.\n");
