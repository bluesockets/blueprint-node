#!/bin/sh

echo "env vars:\n"
printenv
echo "\n\n"

echo "stopping forever"
~/.nvm/versions/node/v5.0.0/lib/node_modules/forever/bin/forever stop 0
echo "\n\n"

echo "git update"
git pull origin master
echo "\n\n"

echo "npm install"
npm install .
echo "\n\n"

echo "starting forever"
NODE_ENV=dev ~/.nvm/versions/node/v5.0.0/bin/forever start server.js
echo "\n\n"

echo "build complete"