// ===============================
// Calculator DOM Wiring
// ===============================

let currentExpression = '';

// ------------------------------
// Theme Toggle Logic
// ------------------------------
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');

  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    btn.innerHTML = '☀️';
    btn.title = 'Switch to light mode';
    localStorage.setItem('theme', 'dark');
  } else {
    btn.innerHTML = '🌙';
    btn.title = 'Switch to dark mode';
    localStorage.setItem('theme', 'light');
  }
}

// Set theme on page load from localStorage
window.addEventListener('DOMContentLoaded', function () {
  const theme = localStorage.getItem('theme');
  const body = document.body;
  const btn = document.getElementById('theme-toggle');

  if (btn) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      btn.innerHTML = '☀️';
      btn.title = 'Switch to light mode';
    } else {
      btn.innerHTML = '🌙';
      btn.title = 'Switch to dark mode';
    }
  }
});

// ------------------------------
// Basic Calculator Functions
// ------------------------------
function appendToResult(value) {
  currentExpression += value.toString();
  updateResult();
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateResult();
}

function operatorToResult(value) {
  currentExpression += value;
  updateResult();
}

function clearResult() {
  currentExpression = '';
  updateResult();
}

function updateResult() {
  document.getElementById('result').value = currentExpression || '0';
}

// ------------------------------
// Calculate Result (uses evaluateExpression from calculator.js)
// ------------------------------
function calculateResult() {
  if (!currentExpression) return;
  const display = document.getElementById('result');

  try {
    const result = evaluateExpression(currentExpression);
    display.value = String(result);
    currentExpression = String(result);
  } catch (e) {
    display.value = 'Error';
    currentExpression = '';
  }
}

// ------------------------------
// Area of Square Feature
// ------------------------------
/**
 * Trigger the Area of Square feature.
 * Prompts the user for the side length, calculates area, and displays it.
 */
function areaSquare() {
  const display = document.getElementById('result');
  const input = prompt('Enter the side length of the square:');

  if (input === null || input.trim() === '') return;

  const side = parseFloat(input);

  try {
    const result = areaOfSquare(side);
    display.value = 'Area = ' + result;
    currentExpression = String(result);
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}