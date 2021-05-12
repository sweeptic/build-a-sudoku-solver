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

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
