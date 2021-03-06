'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { getRow } = require('../controllers/Utils/utils.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    if (typeof req.body.coordinate === 'undefined' || typeof req.body.value === 'undefined') {
      return res.status(200).json({ error: 'Required field(s) missing' });
    }

    const isValidCoord = /^[a-iA-I1-9]{2}$/.test(req.body.coordinate);
    if (!isValidCoord) {
      return res.status(200).json({ error: 'Invalid coordinate' });
    }

    const isValidValue = /^[1-9]{1}$/.test(req.body.value);
    if (!isValidValue) {
      return res.status(200).json({ error: 'Invalid value' });
    }

    const puzzleString = req.body.puzzle;
    const validatedPuzzle = solver.validate(puzzleString);

    if (!validatedPuzzle.isValid) {
      return res.status(200).json(validatedPuzzle);
    }

    const row = req.body.coordinate.slice(0, 1);
    const column = +req.body.coordinate.slice(1, 2);
    const value = +req.body.value;
    const conflicts = [];

    const index = (getRow(row) - 1) * 9 + column - 1;
    const holeString = puzzleString.slice(0, index) + '.' + puzzleString.slice(index + 1);

    const rowP = solver.checkRowPlacement(holeString, row, column, value);
    const colP = solver.checkColPlacement(holeString, row, column, value);
    const regP = solver.checkRegionPlacement(holeString, row, column, value);

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

    const puzzleSolution = solver.solve(puzzleString);

    return res.status(200).json(puzzleSolution);
  });
};
