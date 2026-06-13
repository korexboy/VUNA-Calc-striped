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

  // Setup dropdown
  setupAreaDropdown();
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
// Calculate Result
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
// Area Dropdown Feature
// ------------------------------

function setupAreaDropdown() {
  const dropdown = document.getElementById('area-dropdown');
  if (!dropdown) return;

  dropdown.addEventListener('change', function () {
    const selected = this.value;
    if (!selected) return;

    // Reset dropdown after selection
    this.value = '';

    // Route to correct function
    switch (selected) {
      case 'square':
        areaSquare();
        break;
      case 'rectangle':
        areaRectangle();
        break;
      case 'circle':
        areaCircle();
        break;
    }
  });
}

/**
 * Area of Square — prompts for side, calculates side².
 */
function areaSquare() {
  const display = document.getElementById('result');
  const input = prompt('Enter the side length of the square:');

  if (input === null || input.trim() === '') return;

  const side = parseFloat(input);

  try {
    const result = areaOfSquare(side);
    display.value = 'Square Area = ' + result.toFixed(2);
    currentExpression = String(result);
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}

/**
 * Area of Rectangle — prompts for length and width, calculates length × width.
 */
function areaRectangle() {
  const display = document.getElementById('result');
  const lengthInput = prompt('Enter the length of the rectangle:');

  if (lengthInput === null || lengthInput.trim() === '') return;

  const widthInput = prompt('Enter the width of the rectangle:');
  if (widthInput === null || widthInput.trim() === '') return;

  const length = parseFloat(lengthInput);
  const width = parseFloat(widthInput);

  try {
    const result = areaOfRectangle(length, width);
    display.value = 'Rectangle Area = ' + result.toFixed(2);
    currentExpression = String(result);
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}

/**
 * Area of Circle — prompts for radius, calculates π × radius².
 */
function areaCircle() {
  const display = document.getElementById('result');
  const input = prompt('Enter the radius of the circle:');

  if (input === null || input.trim() === '') return;

  const radius = parseFloat(input);

  try {
    const result = areaOfCircle(radius);
    display.value = 'Circle Area = ' + result.toFixed(2);
    currentExpression = String(result);
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}