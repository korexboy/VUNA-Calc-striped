'use strict';

/**
 * Tokenize an arithmetic expression into numbers, operators, and parentheses.
 */
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9]/.test(ch) || ch === '.') {
      let num = '';
      while (i < expr.length && (/[0-9]/.test(expr[i]) || expr[i] === '.')) {
        num += expr[i];
        i++;
      }
      tokens.push({ type: 'number', value: parseFloat(num) });
      continue;
    }
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
      tokens.push({ type: 'operator', value: ch });
      i++;
      continue;
    }
    if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch });
      i++;
      continue;
    }
    throw new Error('Invalid character: ' + ch);
  }
  return tokens;
}

/**
 * Shunting-yard algorithm: convert infix tokens to RPN (postfix).
 */
function toRPN(tokens) {
  const output = [];
  const ops = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

  for (const token of tokens) {
    if (token.type === 'number') {
      output.push(token);
    } else if (token.type === 'operator') {
      while (
        ops.length > 0 &&
        ops[ops.length - 1].type === 'operator' &&
        precedence[ops[ops.length - 1].value] >= precedence[token.value]
      ) {
        output.push(ops.pop());
      }
      ops.push(token);
    } else if (token.value === '(') {
      ops.push(token);
    } else if (token.value === ')') {
      while (ops.length > 0 && ops[ops.length - 1].value !== '(') {
        output.push(ops.pop());
      }
      if (ops.length === 0) throw new Error('Mismatched parentheses');
      ops.pop(); // remove '('
    }
  }

  while (ops.length > 0) {
    if (ops[ops.length - 1].value === '(') throw new Error('Mismatched parentheses');
    output.push(ops.pop());
  }

  return output;
}

/**
 * Evaluate RPN tokens.
 */
function evalRPN(rpn) {
  const stack = [];
  for (const token of rpn) {
    if (token.type === 'number') {
      stack.push(token.value);
    } else if (token.type === 'operator') {
      if (stack.length < 2) throw new Error('Invalid expression');
      const b = stack.pop();
      const a = stack.pop();
      let result;
      switch (token.value) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
          if (b === 0) throw new Error('Division by zero');
          result = a / b;
          break;
        default: throw new Error('Unknown operator: ' + token.value);
      }
      stack.push(result);
    }
  }
  if (stack.length !== 1) throw new Error('Invalid expression');
  return stack[0];
}

/**
 * Evaluate an arithmetic expression string safely (no eval).
 */
function evaluateExpression(expr) {
  if (!expr || expr.trim() === '') {
    throw new Error('Empty expression');
  }
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  return evalRPN(rpn);
}

/**
 * Calculate the area of a square given the length of one side.
 * @param {number} side - Length of one side of the square.
 * @returns {number} - Area of the square (side * side).
 * @throws {Error} - If side is not a number, negative, or not finite.
 */
function areaOfSquare(side) {
  if (typeof side !== 'number' || !Number.isFinite(side)) {
    throw new Error('Side must be a valid number');
  }
  if (side < 0) {
    throw new Error('Side cannot be negative');
  }
  return side * side;
}

// Export for Node.js / Jest testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression, areaOfSquare };
}