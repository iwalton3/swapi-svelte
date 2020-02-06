#!/bin/bash
cd "$(dirname "$0")"
if ! grep -q "bundle.js" index.html
then
    echo "No action needed."
    exit
fi

JSSrc="bundle.js"
JSHash=$(md5sum "$JSSrc")
JSDest="cached-bundles/bundle-${JSHash:0:16}.js"

CSSSrc="bundle.css"
CSSHash=$(md5sum "$CSSSrc")
CSSDest="cached-bundles/bundle-${CSSHash:0:16}.css"

sed -e "s#$JSSrc#$JSDest#g" -e "s#$CSSSrc#$CSSDest#g" -i index.html
rm -r cached-bundles
mkdir cached-bundles
mv "$JSSrc" "$JSDest"
mv "$CSSSrc" "$CSSDest"

