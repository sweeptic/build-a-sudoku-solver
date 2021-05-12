'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const puzzleString = req.body.puzzle;
    const row = req.body.coordinate.slice(0, 1);
    const column = +req.body.coordinate.slice(1, 2);
    const value = +req.body.value;
    const conflicts = [];

    const rowP = solver.checkRowPlacement(puzzleString, row, column, value);
    const colP = solver.checkColPlacement(puzzleString, row, column, value);
    const regP = solver.checkRegionPlacement(puzzleString, row, column, value);

    const result = {
      valid: rowP.valid && colP.valid && regP.valid,
    };

    rowP.conflict && conflicts.push(...rowP.conflict);
    colP.conflict && conflicts.push(...colP.conflict);
    regP.conflict && conflicts.push(...regP.conflict);

    if (conflicts.length) {
      result.conflict = conflicts;
    }

    res.json(result);
  });

  app.route('/api/solve').post((req, res) => {
    const puzzleString = req.body.puzzle;
    const validatedPuzzle = solver.validate(puzzleString);

    if (!validatedPuzzle.isValid) {
      return res.status(200).json(validatedPuzzle);
    }
  });
};
