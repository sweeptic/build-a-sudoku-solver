'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {});

  app.route('/api/solve').post((req, res) => {
    const puzzleString = req.body.puzzle;
    const validatedPuzzle = solver.validate(puzzleString);

    if (!validatedPuzzle.isValid) {
      return res.status(200).json(validatedPuzzle);
    }
  });
};
