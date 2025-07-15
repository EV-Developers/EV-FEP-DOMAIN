#!/bin/bash

# Stop script on error
set -e

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Functions for printing with color
info() {
  echo -e "${BLUE}[INFO] $1${NC}"
}

success() {
  echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warn() {
  echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
  echo -e "${RED}[ERROR] $1${NC}"
}

# Script starts
info "Building project..."
npm run build

info "Copying files to ../build/dist..."
cp -R ./dist/* ../build/dist

info "Cleaning up dist folder..."
rm -rfv dist

info "Staging changes for Git..."
cd ../build/dist
git add .

info "Committing changes..."
git commit -m "upload new update"

info "Pushing to remote..."
git push

success "Deployment completed successfully!"
