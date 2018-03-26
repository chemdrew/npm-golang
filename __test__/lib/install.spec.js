const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

let install;
let consoleStub;

test.beforeEach(t => {
  consoleStub = sinon.stub(console, 'info');
  mocks['./_download'] = sinon.stub();
  mocks['./_unpack'] = sinon.stub();
  mocks['./defaults'] = { arch: 'arch', platform: 'platform', go: { version: 'version', tarPath: 'tarPath', dirPath: 'dirPath' } };
  install = proxyquire('./../../lib/install', mocks);
});

test.afterEach(t => {
  consoleStub.restore();
});

test.serial.cb('downloads and unpacks', t => {
  mocks['./_download'].returns(Promise.resolve());
  mocks['./_unpack'].returns(Promise.resolve());
  install(undefined, (err) => {
    t.is(err, undefined);
    const downloadAssertion = mocks['./_download'].calledWith('https://dl.google.com/go/goversion.platform-arch.tar.gz', 'tarPath');
    const unpackAssertion = mocks['./_unpack'].calledWith('tarPath', 'dirPath');
    t.true(downloadAssertion, `download called with ${JSON.stringify(mocks['./_download'].args[0])}`);
    t.true(unpackAssertion, `unpack called with ${JSON.stringify(mocks['./_unpack'].args[0])}`);
    t.end();
  });
});

test.serial.cb('downloads and unpacks with options', t => {
  mocks['./_download'].returns(Promise.resolve());
  mocks['./_unpack'].returns(Promise.resolve());
  install({ Version: 'newVersion', arch: 'newArch', platform: 'newPlatform' }, (err) => {
    t.is(err, undefined);
    const downloadAssertion = mocks['./_download'].calledWith('https://dl.google.com/go/gonewVersion.newPlatform-newArch.tar.gz', 'tarPath');
    const unpackAssertion = mocks['./_unpack'].calledWith('tarPath', 'dirPath');
    t.true(downloadAssertion, `download called with ${JSON.stringify(mocks['./_download'].args[0])}`);
    t.true(unpackAssertion, `unpack called with ${JSON.stringify(mocks['./_unpack'].args[0])}`);
    t.end();
  });
});

test.serial.cb('downloads and unpacks with url', t => {
  mocks['./_download'].returns(Promise.resolve());
  mocks['./_unpack'].returns(Promise.resolve());
  install({ from: 'some url' }, (err) => {
    t.is(err, undefined);
    const downloadAssertion = mocks['./_download'].calledWith('some url', 'tarPath');
    const unpackAssertion = mocks['./_unpack'].calledWith('tarPath', 'dirPath');
    t.true(downloadAssertion, `download called with ${JSON.stringify(mocks['./_download'].args[0])}`);
    t.true(unpackAssertion, `unpack called with ${JSON.stringify(mocks['./_unpack'].args[0])}`);
    t.end();
  });
});

test.serial.cb('error downloading', t => {
  mocks['./_download'].returns(Promise.reject('some error'));
  mocks['./_unpack'].returns(Promise.resolve());
  install(undefined, (err) => {
    t.is(err, 'some error');
    const downloadAssertion = mocks['./_download'].calledWith('https://dl.google.com/go/goversion.platform-arch.tar.gz', 'tarPath');
    const unpackAssertion = mocks['./_unpack'].notCalled;
    t.true(downloadAssertion, `download called with ${JSON.stringify(mocks['./_download'].args[0])}`);
    t.true(unpackAssertion, 'unpack should not be called');
    t.end();
  });
});

test.serial.cb('error unpacking', t => {
  mocks['./_download'].returns(Promise.resolve());
  mocks['./_unpack'].returns(Promise.reject('some error'));
  install(undefined, (err) => {
    t.is(err, 'some error');
    const downloadAssertion = mocks['./_download'].calledWith('https://dl.google.com/go/goversion.platform-arch.tar.gz', 'tarPath');
    const unpackAssertion = mocks['./_unpack'].calledWith('tarPath', 'dirPath');
    t.true(downloadAssertion, `download called with ${JSON.stringify(mocks['./_download'].args[0])}`);
    t.true(unpackAssertion, `unpack called with ${JSON.stringify(mocks['./_unpack'].args[0])}`);
    t.end();
  });
});

test.serial.cb('fire and forget', t => {
  mocks['./_download'].returns(Promise.resolve());
  mocks['./_unpack'].returns(Promise.resolve());
  install();
  t.pass();
  t.end();
});
