const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const {
  validPuzzleString,
  invalidPuzzleString,
  invalidPuzzleString_moreChar,
  invalidPuzzleString_lessChar,
} = require('./cases/puzzle.js');
let solver;

suite('UnitTests', () => {
  beforeEach(() => {
    solver = new Solver();
  });

  test('Logic handles a valid puzzle string of 81 characters ', () => {
    const result = solver.validate(validPuzzleString);
    assert.isObject(result);
    assert.equal(result.isValid, true);
    assert.strictEqual(result.error, '');
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .) ', () => {
    const result = solver.validate(invalidPuzzleString);
    assert.isObject(result);
    assert.equal(result.isValid, false);
    assert.strictEqual(result.error, 'Invalid characters in puzzle');
  });

  test('Logic handles a puzzle string that is not 81 characters in length ', () => {
    const result = solver.validate(invalidPuzzleString_moreChar);
    assert.isObject(result);
    assert.equal(result.isValid, false);
    assert.strictEqual(result.error, 'Expected puzzle to be 81 characters long');
  });

  test('Logic handles a puzzle string that is not 81 characters in length ', () => {
    const result = solver.validate(invalidPuzzleString_lessChar);
    assert.isObject(result);
    assert.equal(result.isValid, false);
    assert.strictEqual(result.error, 'Expected puzzle to be 81 characters long');
  });

  test('Logic handles a valid row placement ', () => {
    const result = solver.checkRowPlacement(validPuzzleString, 'a', 1, 7);
    assert.isObject(result);
    assert.property(result, 'valid', 'result should have valid property');
    assert.isTrue(result.valid);
  });

  test('Logic handles a invalid row placement ', () => {
    const result = solver.checkRowPlacement(validPuzzleString, 'd', 3, 3);
    assert.isObject(result);
    assert.property(result, 'valid', 'result should have valid property');
    assert.property(result, 'conflict', 'result should have conflict property');
    assert.isFalse(result.valid);
    assert.isArray(result.conflict);
    assert.deepEqual(result.conflict, ['row']);
  });

  test('Logic handles a valid column placement ', () => {
    const result = solver.checkColPlacement(validPuzzleString, 'a', 1, 7);
    assert.isObject(result);
    assert.property(result, 'valid', 'result should have valid property');
    assert.isTrue(result.valid);
  });

  test('Logic handles a invalid column placement ', () => {
    const result = solver.checkColPlacement(validPuzzleString, 'a', 1, 6);
    assert.isObject(result);
    assert.property(result, 'valid', 'result should have valid property');
    assert.property(result, 'conflict', 'result should have conflict property');
    assert.isFalse(result.valid);
    assert.isArray(result.conflict);
    assert.deepEqual(result.conflict, ['column']);
  });
});

/*
*Logic handles a valid puzzle string of 81 characters
*Logic handles a puzzle string with invalid characters (not 1-9 or .)
*Logic handles a puzzle string that is not 81 characters in length
*Logic handles a valid row placement
*Logic handles an invalid row placement
Logic handles a valid column placement
Logic handles an invalid column placement
Logic handles a valid region (3x3 grid) placement
Logic handles an invalid region (3x3 grid) placement
Valid puzzle strings pass the solver
Invalid puzzle strings fail the solver
Solver returns the the expected solution for an incomplete puzzle
*/
