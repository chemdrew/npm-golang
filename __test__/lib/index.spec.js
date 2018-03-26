const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

let library = require('./../../lib');

test('exposes install method', t => {
  t.true(typeof library.install === 'function', 'install is not exposed');
});

test('exposes go method', t => {
  t.true(typeof library.go === 'function', 'go is not exposed');
});
