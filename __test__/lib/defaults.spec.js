const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

const path = require('path');
const pJson = require('./../../package.json');

let defaults;

test.beforeEach(t => {
  mocks['os'] = { arch: sinon.stub(), platform: sinon.stub() };
  defaults = proxyquire('./../../lib/defaults', mocks);
})

test('version', t => {
  t.is(defaults.version, pJson.version, 'default version does not match package.json version');
});

test('arch', t => {
  mocks['os'].arch.returns('arch');
  defaults = proxyquire('./../../lib/defaults', mocks); // reinstantiate the module since values are defined at instantiation
  t.is(defaults.arch, 'arch', 'default arch does not match the operating system arch');
});

test('arch', t => {
  mocks['os'].arch.returns('x64');
  defaults = proxyquire('./../../lib/defaults', mocks); // reinstantiate the module since values are defined at instantiation
  t.is(defaults.arch, 'amd64', 'default arch does not match the operating system arch');
});

test('platform', t => {
  mocks['os'].platform.returns('platform');
  defaults = proxyquire('./../../lib/defaults', mocks); // reinstantiate the module since values are defined at instantiation
  t.is(defaults.platform, 'platform', 'default platform does not match the operating system platform');
});

test('go version', t => {
  t.is(defaults.go.version, '1.10', 'default go version does not match 1.10, this must be updated every time a new golang is released');
});

test('go tarPath', t => {
  t.is(defaults.go.tarPath, path.join(__dirname, '../..', '/go-download.tar.gz'), 'default go tar download path does not match expected file location');
});

test('go dirPath', t => {
  t.is(defaults.go.dirPath, path.join(__dirname, '../..', '/go-download'), 'default go directory does not match expected directory location');
});

test('go executable', t => {
  t.is(defaults.go.executable, path.join(__dirname, '../..', '/go-download/go/bin/go'), 'default go executable does not match expected executable location');
});
