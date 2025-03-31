#!/bin/bash

# Install dependencies and run commands
npm install
npm run test || true  # Continue even if tests fail
npm run build
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d