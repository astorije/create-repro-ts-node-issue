#!/usr/bin/env node

require('ts-node').register({
  project: require('path').resolve(__dirname, 'tsconfig.json'),
});

require('./src');
