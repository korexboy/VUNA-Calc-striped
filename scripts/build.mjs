import { rmSync, mkdirSync, cpSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

// Copy both pages
cpSync('index.html', 'dist/index.html');
cpSync('calculator.html', 'dist/calculator.html');

// Copy assets and src
cpSync('assets', 'dist/assets', { recursive: true });
cpSync('src', 'dist/src', { recursive: true });

console.log('Build complete -> dist/');