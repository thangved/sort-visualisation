yarn build
git add .
git commit -m "update"
npm version patch
npm publish
sh ./push.bash