#!/bin/sh


echo "env vars:\n"
printenv
echo "\n\n"

if [ "$BUILD_TAG" = "" ]
then
    BUILD_TAG='local'
fi


echo "npm install"
~/.nvm/versions/node/v5.0.0/bin/npm install .
echo "\n\n"

echo "forever stopall"
~/.nvm/versions/node/v5.0.0/bin/forever stopall
echo "\n\n"

echo "forever start build-$BUILD_TAG"
NODE_ENV=jasmine ~/.nvm/versions/node/v5.0.0/bin/forever start --uid "build-$BUILD_TAG" server.js
echo "\n\n"

echo "running tests for build-$BUILD_TAG"
jasmineTests() {
    NODE_ENV=jasmine ~/.nvm/versions/node/v5.0.0/bin/jasmine-node --captureExceptions specs >&2

    if [ $? -eq 0 ]
    then
        echo  0
        return
    fi

    echo 1
}
result=$(jasmineTests)
echo "\n\n"

echo "forever stopall build-$BUILD_TAG"
~/.nvm/versions/node/v5.0.0/bin/forever stopall
echo "\n\n"

echo "STATUS: $result\n\n"
exit ${result}