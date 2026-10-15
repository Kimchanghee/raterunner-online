/** Pick the first variant whose length is within [min,max]; parts[0] is the base, the rest are optional tails. */
export function fitDescription(parts: string[], min = 150, max = 160): string {
  const base = parts[0]!;
  const variants = [base, ...parts.slice(1).map((t) => base + t)];
  const ok = variants.find((v) => v.length >= min && v.length <= max);
  if (ok) return ok;
  // Otherwise take the longest variant under max, or trim the shortest at a word boundary.
  const under = variants.filter((v) => v.length <= max).sort((a, b) => b.length - a.length)[0];
  if (under && under.length >= min - 20) return under;
  const v = variants.sort((a, b) => a.length - b.length)[0]!;
  if (v.length <= max) return v;
  const cut = v.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export function pluralCurrency(name: string): string {
  return name === 'Euro' ? 'euros' : name + 's';
}
