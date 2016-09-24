#!/bin/sh
#matt de marillac - 2016

cd ../Chrome\ Extension;
echo "Reading chrome manifest version file:";
ver=`cat manifest.json | grep "\"version\"" | sed 's/[^0-9.]*\([0-9.]*\).*/\1/' | sed -n "1p"`;
echo "${ver} found!...";

echo "Cleaning rubish files...";
find ../ -name '.DS_Store' -type f -delete;

echo "Creating zip folder in directory build...";
zip "../Build/chrome-extension-v${ver}.zip" -r * >> /dev/null;
echo "chrome-extension-v${ver}.zip created!...";
