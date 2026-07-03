export type LivePrices = Record<string, Record<string, number>>; // slug -> weight -> price

/** Minimal CSV parser — good enough for a simple slug,weight,price sheet. */
function parseCsv(text: string): string[][] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")));
}

/** Turns the published Google Sheet CSV into a slug -> weight -> price lookup. */
export function parseLivePricesCsv(text: string): LivePrices {
  const rows = parseCsv(text);
  const [header, ...dataRows] = rows;
  if (!header) return {};

  const slugIdx = header.findIndex((h) => h.toLowerCase() === "slug");
  const weightIdx = header.findIndex((h) => h.toLowerCase() === "weight");
  const priceIdx = header.findIndex((h) => h.toLowerCase() === "price");
  if (slugIdx === -1 || weightIdx === -1 || priceIdx === -1) return {};

  const result: LivePrices = {};
  for (const row of dataRows) {
    const slug = row[slugIdx]?.trim();
    const weight = row[weightIdx]?.trim();
    const price = parseFloat(row[priceIdx]);
    if (!slug || !weight || Number.isNaN(price)) continue;
    result[slug] ??= {};
    result[slug][weight] = price;
  }
  return result;
}

/** Overrides hardcoded variant prices with live sheet prices where present; leaves everything else untouched. */
export function applyLivePrices<T extends { slug: string; variants: { weight: string; price: number }[] }>(
  items: T[],
  live: LivePrices
): T[] {
  if (Object.keys(live).length === 0) return items;
  return items.map((item) => {
    const overrides = live[item.slug];
    if (!overrides) return item;
    return {
      ...item,
      variants: item.variants.map((v) =>
        overrides[v.weight] !== undefined ? { ...v, price: overrides[v.weight] } : v
      ),
    };
  });
}
