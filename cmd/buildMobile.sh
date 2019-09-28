ionic cordova build $1 && 
npm run ionic:build && 
node tools/mobile-build && 
cp -a www/. ./platforms/$1/www