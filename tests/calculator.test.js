const { evaluateExpression, areaOfSquare } = require('../src/calculator');

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
describe('areaOfSquare - Custom Feature', () => {
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

  it('handles large numbers', () => {
    expect(areaOfSquare(1000)).toBe(1000000);
  });
});