import { getRow } from './Utils/utils';
class SudokuSolver {
  validate(puzzleString) {
    const isValid = /^[0-9.]{81}$/.test(puzzleString);

    const error =
      typeof puzzleString === 'undefined'
        ? 'Required field missing'
        : puzzleString.length !== 81
        ? 'Expected puzzle to be 81 characters long'
        : !isValid
        ? 'Invalid characters in puzzle'
        : '';

    return { isValid, error };
  }

  checkRowPlacement(puzzleString, rowAlpha, column, value) {
    const row = getRow(rowAlpha);

    return puzzleString.slice((row - 1) * 9, row * 9).includes(value)
      ? { valid: false, conflict: ['row'] }
      : { valid: true };
  }

  checkColPlacement(puzzleString, row, column, value) {
    const columns = [];

    while (column <= 81) {
      columns.push(puzzleString[column - 1]);
      column += 9;
    }

    return columns.includes(value.toString())
      ? { valid: false, conflict: ['column'] }
      : { valid: true };
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
