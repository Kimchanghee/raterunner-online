import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Mobile ranked ledger: the "Set aside" group header inherits th nowrap from the desktop table rule,
// which pushed home-page scrollWidth to 397px at a 390px viewport. It must wrap in the stacked layout.
test('stacked ranked ledger lets the set-aside header wrap', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const media = css.slice(css.indexOf('@media (max-width: 40rem) {\n  table.ledger.ranked'));
  const rule = media.match(/table\.ledger\.ranked tr\.aside-h th \{([^}]*)\}/);
  assert.ok(rule, 'aside-h th rule exists in the mobile ranked block');
  assert.match(rule[1], /white-space:\s*normal/);
});
