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

  checkRegionPlacement(puzzleString, rowAlpha, column, value) {
    const row = getRow(rowAlpha);
    const region = [];
    let startPos,
      rowCount = 0;

    //set matching region left top position by column
    startPos = column % 3 !== 0 ? Math.floor(column / 3) * 3 + 1 : column - 2;

    //set matching region left top position by row
    startPos += (row % 3 !== 0 ? Math.floor(row / 3) : Math.floor(row / 3) - 1) * 27;

    //fill the region array
    while (rowCount < 3) {
      for (let i = -1; i < 2; i++) {
        region.push(puzzleString[startPos + i]);
      }
      startPos += 9;
      rowCount++;
    }

    return region.includes(value.toString())
      ? { valid: false, conflict: ['region'] }
      : { valid: true };
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
