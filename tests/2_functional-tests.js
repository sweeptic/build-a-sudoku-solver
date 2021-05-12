const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { invalidPuzzleString, invalidPuzzleString_lessChar } = require('./cases/puzzle');

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
});

/*
Solve a puzzle with valid puzzle string: POST request to /api/solve
*Solve a puzzle with missing puzzle string: POST request to /api/solve
*Solve a puzzle with invalid characters: POST request to /api/solve
*Solve a puzzle with incorrect length: POST request to /api/solve
Solve a puzzle that cannot be solved: POST request to /api/solve
Check a puzzle placement with all fields: POST request to /api/check
Check a puzzle placement with single placement conflict: POST request to /api/check
Check a puzzle placement with multiple placement conflicts: POST request to /api/check
Check a puzzle placement with all placement conflicts: POST request to /api/check
Check a puzzle placement with missing required fields: POST request to /api/check
Check a puzzle placement with invalid characters: POST request to /api/check
Check a puzzle placement with incorrect length: POST request to /api/check
Check a puzzle placement with invalid placement coordinate: POST request to /api/check
Check a puzzle placement with invalid placement value: POST request to /api/check
*/
