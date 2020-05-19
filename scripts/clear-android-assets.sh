#!/bin/sh

rm -rf android/app/build/generated
rm -rf android/app/src/main/res/drawable-mdpi
rm -rf android/app/src/main/res/raw 

resPath='./android/app/src/main/res/'

ls $resPath | grep "drawable-" | while read -r folder ; do
path="$resPath$folder"
echo "Processing $folder"
ls $path | grep -E "node_modules_|assets_" | xargs -d "\n" -I % sh -c "rm -rf $path/%;"
done