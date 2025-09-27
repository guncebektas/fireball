#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get settings file path from command line argument
const settingsFile = process.argv[2];

if (!settingsFile) {
  console.error('Usage: node get-brand.js <settings-file>');
  process.exit(1);
}

try {
  const settingsPath = path.resolve(settingsFile);
  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  const settings = JSON.parse(settingsContent);
  
  const brand = settings.public?.app?.brand || 'ritapos';
  console.log(brand);
} catch (error) {
  console.error('Error reading settings file:', error.message);
  console.log('ritapos'); // fallback
  process.exit(1);
}
