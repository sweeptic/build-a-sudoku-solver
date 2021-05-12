const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const {
  invalidPuzzleString,
  invalidPuzzleString_lessChar,
  validPuzzleString,
} = require('./cases/puzzle');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    chai
      .request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: invalidPuzzleString,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'isValid', 'response should have isValid property');
        assert.property(res.body, 'error', 'response should have error property');
        assert.isFalse(res.body.isValid);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    chai
      .request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: invalidPuzzleString_lessChar,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'isValid', 'response should have isValid property');
        assert.property(res.body, 'error', 'response should have error property');
        assert.isFalse(res.body.isValid);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    chai
      .request(server)
      .post('/api/solve')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'error', 'response should have error property');
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict ( row ): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'd3',
        value: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['row']);
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict ( column ): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'g4',
        value: 7,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['column']);
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict ( region ): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'a1',
        value: 2,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['region']);
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts (row, column): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'g3',
        value: 9,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['row', 'column']);
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts (row, region): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'a1',
        value: 9,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['row', 'region']);
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts (column, region): POST request to /api/check', function (done) {
    chai
      .request(server)
      .post('/api/check')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        puzzle: validPuzzleString,
        coordinate: 'i9',
        value: 7,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'valid', 'response should have valid property');
        assert.property(res.body, 'conflict', 'response should have conflict property');
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ['column', 'region']);
        done();
      });
  });
});
/*
Solve a puzzle with valid puzzle string: POST request to /api/solve
*Solve a puzzle with missing puzzle string: POST request to /api/solve
*Solve a puzzle with invalid characters: POST request to /api/solve
*Solve a puzzle with incorrect length: POST request to /api/solve
Solve a puzzle that cannot be solved: POST request to /api/solve
Check a puzzle placement with all fields: POST request to /api/check
*Check a puzzle placement with single placement conflict: POST request to /api/check
*Check a puzzle placement with multiple placement conflicts: POST request to /api/check
Check a puzzle placement with all placement conflicts: POST request to /api/check
Check a puzzle placement with missing required fields: POST request to /api/check
Check a puzzle placement with invalid characters: POST request to /api/check
Check a puzzle placement with incorrect length: POST request to /api/check
Check a puzzle placement with invalid placement coordinate: POST request to /api/check
Check a puzzle placement with invalid placement value: POST request to /api/check
*/
