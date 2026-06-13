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
// Area Feature — Inline Panels
// ------------------------------

/**
 * Handle dropdown selection — show the correct input panel.
 */
function handleAreaSelect(value) {
  // Hide all panels first
  hideAreaPanel();

  // Reset dropdown
  const dropdown = document.getElementById('area-dropdown');
  if (dropdown) dropdown.value = '';

  // Show selected panel
  if (value) {
    const panel = document.getElementById('panel-' + value);
    if (panel) {
      panel.classList.add('active');
      // Auto-focus the first input
      const firstInput = panel.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }
}

/**
 * Hide all area input panels.
 */
function hideAreaPanel() {
  const panels = document.querySelectorAll('.area-panel');
  panels.forEach(function (panel) {
    panel.classList.remove('active');
  });

  // Clear all inputs
  const inputs = document.querySelectorAll('.area-input');
  inputs.forEach(function (input) {
    input.value = '';
  });
}

/**
 * Calculate Area of Square.
 */
function calculateSquare() {
  const display = document.getElementById('result');
  const sideInput = document.getElementById('square-side');
  const side = parseFloat(sideInput.value);

  try {
    const result = areaOfSquare(side);
    display.value = 'Square Area = ' + result.toFixed(2);
    currentExpression = String(result);
    hideAreaPanel();
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}

/**
 * Calculate Area of Rectangle.
 */
function calculateRectangle() {
  const display = document.getElementById('result');
  const lengthInput = document.getElementById('rect-length');
  const widthInput = document.getElementById('rect-width');
  const length = parseFloat(lengthInput.value);
  const width = parseFloat(widthInput.value);

  try {
    const result = areaOfRectangle(length, width);
    display.value = 'Rectangle Area = ' + result.toFixed(2);
    currentExpression = String(result);
    hideAreaPanel();
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}

/**
 * Calculate Area of Circle.
 */
function calculateCircle() {
  const display = document.getElementById('result');
  const radiusInput = document.getElementById('circle-radius');
  const radius = parseFloat(radiusInput.value);

  try {
    const result = areaOfCircle(radius);
    display.value = 'Circle Area = ' + result.toFixed(2);
    currentExpression = String(result);
    hideAreaPanel();
  } catch (e) {
    display.value = 'Error: ' + e.message;
    currentExpression = '';
  }
}