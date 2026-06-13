const { evaluateExpression, areaOfSquare, areaOfRectangle, areaOfCircle } = require('../src/calculator');

// ==========================
// evaluateExpression Tests
// ==========================
describe('evaluateExpression - Arithmetic', () => {
  it('adds two numbers', () => {
    expect(evaluateExpression('2+3')).toBe(5);
  });

  it('subtracts two numbers', () => {
    expect(evaluateExpression('10-4')).toBe(6);
  });

  it('multiplies two numbers', () => {
    expect(evaluateExpression('3*4')).toBe(12);
  });

  it('divides two numbers', () => {
    expect(evaluateExpression('12/4')).toBe(3);
  });

  it('respects operator precedence', () => {
    expect(evaluateExpression('2+3*4')).toBe(14);
  });

  it('handles parentheses', () => {
    expect(evaluateExpression('(2+3)*4')).toBe(20);
  });

  it('handles decimal numbers', () => {
    expect(evaluateExpression('2.5+3.5')).toBe(6);
  });

  it('handles chained operations', () => {
    expect(evaluateExpression('10-3*2+8/4')).toBe(6);
  });

  it('rejects empty expression', () => {
    expect(() => evaluateExpression('')).toThrow('Empty expression');
  });

  it('rejects invalid characters', () => {
    expect(() => evaluateExpression('2&3')).toThrow('Invalid character');
  });

  it('rejects division by zero', () => {
    expect(() => evaluateExpression('10/0')).toThrow('Division by zero');
  });

  it('rejects mismatched parentheses', () => {
    expect(() => evaluateExpression('(2+3')).toThrow('Mismatched parentheses');
  });
});

// ==========================
// areaOfSquare Tests
// ==========================
describe('areaOfSquare', () => {
  it('calculates area for positive integer', () => {
    expect(areaOfSquare(5)).toBe(25);
  });

  it('calculates area for positive decimal', () => {
    expect(areaOfSquare(2.5)).toBe(6.25);
  });

  it('returns 0 for side = 0', () => {
    expect(areaOfSquare(0)).toBe(0);
  });

  it('rejects negative side length', () => {
    expect(() => areaOfSquare(-4)).toThrow('Side cannot be negative');
  });

  it('rejects non-number input (string)', () => {
    expect(() => areaOfSquare('five')).toThrow('Side must be a valid number');
  });

  it('rejects NaN input', () => {
    expect(() => areaOfSquare(NaN)).toThrow('Side must be a valid number');
  });

  it('rejects Infinity input', () => {
    expect(() => areaOfSquare(Infinity)).toThrow('Side must be a valid number');
  });
});

// ==========================
// areaOfRectangle Tests
// ==========================
describe('areaOfRectangle', () => {
  it('calculates area for positive integers', () => {
    expect(areaOfRectangle(5, 4)).toBe(20);
  });

  it('calculates area for positive decimals', () => {
    expect(areaOfRectangle(3.5, 2.0)).toBe(7);
  });

  it('returns 0 when length is 0', () => {
    expect(areaOfRectangle(0, 5)).toBe(0);
  });

  it('returns 0 when width is 0', () => {
    expect(areaOfRectangle(5, 0)).toBe(0);
  });

  it('rejects negative length', () => {
    expect(() => areaOfRectangle(-5, 4)).toThrow('Length cannot be negative');
  });

  it('rejects negative width', () => {
    expect(() => areaOfRectangle(5, -4)).toThrow('Width cannot be negative');
  });

  it('rejects string input for length', () => {
    expect(() => areaOfRectangle('five', 4)).toThrow('Length must be a valid number');
  });

  it('rejects string input for width', () => {
    expect(() => areaOfRectangle(5, 'four')).toThrow('Width must be a valid number');
  });

  it('rejects NaN input', () => {
    expect(() => areaOfRectangle(NaN, 4)).toThrow('Length must be a valid number');
  });

  it('handles large numbers', () => {
    expect(areaOfRectangle(100, 200)).toBe(20000);
  });
});

// ==========================
// areaOfCircle Tests
// ==========================
describe('areaOfCircle', () => {
  it('calculates area for radius 1', () => {
    expect(areaOfCircle(1)).toBeCloseTo(Math.PI, 5);
  });

  it('calculates area for radius 2', () => {
    expect(areaOfCircle(2)).toBeCloseTo(12.56637, 5);
  });

  it('calculates area for radius 5', () => {
    expect(areaOfCircle(5)).toBeCloseTo(78.53982, 5);
  });

  it('returns 0 for radius 0', () => {
    expect(areaOfCircle(0)).toBe(0);
  });

  it('rejects negative radius', () => {
    expect(() => areaOfCircle(-3)).toThrow('Radius cannot be negative');
  });

  it('rejects non-number input (string)', () => {
    expect(() => areaOfCircle('three')).toThrow('Radius must be a valid number');
  });

  it('rejects NaN input', () => {
    expect(() => areaOfCircle(NaN)).toThrow('Radius must be a valid number');
  });

  it('rejects Infinity input', () => {
    expect(() => areaOfCircle(Infinity)).toThrow('Radius must be a valid number');
  });

  it('handles decimal radius', () => {
    expect(areaOfCircle(2.5)).toBeCloseTo(19.63495, 5);
  });
});