#!/bin/sh
set -eu

cd "$(dirname "$0")/.."
rm -rf .locale-build out
mkdir -p .locale-build

for language in en fa ru; do
  echo "Building Landing locale: $language"
  rm -rf .next out
  LANDING_BUILD_LANGUAGE="$language" corepack pnpm exec next build
  mv out ".locale-build/$language"
done

# Keep English at the canonical export root for direct/static consumers. The
# gateway internally rewrites Persian and Russian document requests below
# /locales/ while all variants continue to use the same public asset URLs.
mv .locale-build/en out
mkdir -p out/locales
cp -a .locale-build/fa out/locales/fa
cp -a .locale-build/ru out/locales/ru

# Each locale build can produce different hashed CSS/JS names. Keep those
# assets under the locale prefix and rewrite absolute Next asset references so
# the gateway can serve the matching bundle.
for language in fa ru; do
  find "out/locales/$language" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.json' \) \
    -exec sed -i "s#/_next/#/locales/$language/_next/#g" {} +
done
rm -rf .locale-build

echo "Landing locale exports ready in out/ and out/locales/."
