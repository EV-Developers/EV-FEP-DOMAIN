#!/bin/bash

#old: "deploy": "npm run build && cd dist && cp -R . ../../build/dist && cd ../ && rm -rfv dist && git add . && git commit -m 'upload new update' && git push && echo 'Deploying success'",

# Stop script on error
set -e

# Build project
echo "Building project..."
npm run build

# Copy to destination
echo "Copying files to build/dist..."
cp -R ./dist/* ../build/dist

# Clean up
echo "Cleaning up dist folder..."
rm -rfv dist

# Git actions
echo "Staging changes..."
git add .

echo "Committing changes..."
git commit -m "upload new update"

echo "Pushing to remote..."
git push

# Final success message
echo "Deploying successful!"
