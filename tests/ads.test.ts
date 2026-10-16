import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Ads gate wiring: AdSense loader is behind site.adsEnabled, which defaults to false.
test('ads are disabled by default and the AdSense loader is gated', () => {
  const cfg = readFileSync('src/site.config.ts', 'utf8');
  assert.match(cfg, /adsEnabled:\s*env\.PUBLIC_ADS_ENABLED === 'true'/);
  const layout = readFileSync('src/layouts/Base.astro', 'utf8');
  assert.match(layout, /\{site\.adsEnabled && <script[^>]*adsbygoogle\.js\?client=\$\{site\.adsenseClient\}/);
  assert.match(layout, /<meta name="google-adsense-account" content=\{site\.adsenseClient\} \/>/);
  assert.doesNotMatch(layout.replace(/\{site\.adsEnabled && <script[^\n]*\n/, ''), /adsbygoogle\.js/);
});
