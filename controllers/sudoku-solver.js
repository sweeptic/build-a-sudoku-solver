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

    return puzzleString.slice((row - 1) * 9, row * 9).includes(value) ? { valid: false, conflict: ['row'] } : { valid: true };
  }

  checkColPlacement(puzzleString, row, column, value) {
    const columns = [];

    while (column <= 81) {
      columns.push(puzzleString[column - 1]);
      column += 9;
    }

    return columns.includes(value.toString()) ? { valid: false, conflict: ['column'] } : { valid: true };
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

    return region.includes(value.toString()) ? { valid: false, conflict: ['region'] } : { valid: true };
  }

  isValidPuzzleChar(puzzle, row, col, item) {
    return (
      this.checkRowPlacement(puzzle, row, col, item)['valid'] &&
      this.checkColPlacement(puzzle, row, col, item)['valid'] &&
      this.checkRegionPlacement(puzzle, row, col, item)['valid']
    );
  }

  solve(puzzle) {
    let storeArray = [puzzle];
    let workingArray = [];
    let nextArray = [];
    let valid = true;

    for (let i = 0; i < 81; i++) {
      workingArray = [...storeArray];
      storeArray = [];

      const row = Math.floor(i / 9) + 1;
      const col = (i + 1) % 9 || 9;

      while (workingArray.length !== 0) {
        const actual = workingArray.shift();

        if (actual.slice(i, i + 1) === '.') {
          //this can be optimalized if check region (3x3) and put number that not in a region..
          //100 vs 55 iteration = -50% per region
          for (let j = 1; j < 10; j++) {
            const isValidPuzzle = this.isValidPuzzleChar(actual, row, col, j);

            if (isValidPuzzle) {
              const nextArr = actual.slice(0, i) + j + actual.slice(i + 1);
              nextArray.push(nextArr);
            }
          }
        } else {
          const modPuzzle = actual.slice(0, i) + '.' + actual.slice(i + 1);
          const value = actual.slice(i, i + 1);
          const isValidPuzzle = this.isValidPuzzleChar(modPuzzle, row, col, value);

          isValidPuzzle ? nextArray.push(actual) : (valid = false);
        }
      }

      storeArray = [...nextArray];
      nextArray = [];
    }

    return valid ? { solution: storeArray[0] } : { error: 'Puzzle cannot be solved' };
  }
}

module.exports = SudokuSolver;
