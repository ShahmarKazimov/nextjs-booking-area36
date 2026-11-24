// Build-time SEO guard (runs automatically before `npm run build` via "prebuild").
// Errors (missing data that would break a page or its rich results) fail the build.
// Warnings (title/description length) are printed only.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(path.join(root, p), "utf8");

// homes.js / guides.js are ES modules inside a CommonJS package: evaluate the default export directly.
function loadDefault(p) {
  const src = read(p).replace(/export\s+const\s+\w+\s*=[^;]*;/g, "").replace(/export\s+default\s+(\w+)\s*;?/, "return $1;");
  return new Function(src)();
}

const homes = loadDefault("src/components/data/homes.js");
const guides = loadDefault("src/components/data/guides.js");
const messages = {
  en: JSON.parse(read("messages/en.json")),
  az: JSON.parse(read("messages/az.json")),
  ru: JSON.parse(read("messages/ru.json")),
};

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const slugs = new Set();
for (const h of homes) {
  const id = `home "${h.slug}"`;
  if (!h.slug) { err("a home has no slug"); continue; }
  if (slugs.has(h.slug)) err(`${id}: duplicate slug`);
  slugs.add(h.slug);
  if (!h.images?.length) err(`${id}: no images`);
  if (!h.geo || h.geo.split(",").length !== 2) err(`${id}: missing/invalid geo ("lat,lng")`);
  if (!h.address?.streetAddress || !h.address?.postalCode) err(`${id}: missing address.streetAddress / postalCode (needed for VacationRental rich results)`);
  if (!h.features?.length) warn(`${id}: no features`);

  for (const loc of ["en", "az", "ru"]) {
    const m = messages[loc]?.Homes?.[h.slug];
    if (!m) { err(`${id}: no Homes.${h.slug} block in messages/${loc}.json`); continue; }
    for (const k of ["title", "description", "location", "type"]) {
      if (!m[k]) err(`${id} [${loc}]: missing "${k}"`);
    }
    for (const f of h.features || []) {
      if (!m.features?.[f]) err(`${id} [${loc}]: missing features."${f}"`);
    }
    if (!m.metaTitle) warn(`${id} [${loc}]: no metaTitle (a generated title will be used)`);
    else if (m.metaTitle.length > 65) warn(`${id} [${loc}]: metaTitle is ${m.metaTitle.length} chars (>65)`);
    if (!m.metaDescription) warn(`${id} [${loc}]: no metaDescription (description will be cut at 155 chars)`);
    else if (m.metaDescription.length < 70 || m.metaDescription.length > 160)
      warn(`${id} [${loc}]: metaDescription is ${m.metaDescription.length} chars (aim 70-160)`);
  }
}

const gslugs = new Set();
for (const g of guides) {
  const id = `guide "${g.slug}"`;
  if (!g.slug) { err("a guide has no slug"); continue; }
  if (gslugs.has(g.slug)) err(`${id}: duplicate slug`);
  gslugs.add(g.slug);
  for (const loc of ["en", "az", "ru"]) {
    const c = g[loc];
    if (!c) { err(`${id}: missing "${loc}" text`); continue; }
    for (const k of ["title", "metaTitle", "description", "intro", "cta"]) if (!c[k]) err(`${id} [${loc}]: missing "${k}"`);
    if (!c.sections?.length) err(`${id} [${loc}]: no sections`);
    if (c.metaTitle?.length > 65) warn(`${id} [${loc}]: metaTitle is ${c.metaTitle.length} chars (>65)`);
    if (c.description && (c.description.length < 70 || c.description.length > 160))
      warn(`${id} [${loc}]: description is ${c.description.length} chars (aim 70-160)`);
  }
}

for (const w of warnings) console.warn(`[seo] warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`[seo] ERROR: ${e}`);
  console.error(`\n[seo] ${errors.length} error(s). Fix them before building.`);
  process.exit(1);
}
console.log(`[seo] OK: ${homes.length} homes, ${guides.length} guides checked (${warnings.length} warning(s)).`);
