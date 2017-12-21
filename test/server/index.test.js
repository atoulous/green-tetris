import { Server } from '_http_server'; // eslint-disable-line import/no-unresolved
import sinon from 'sinon';
import { expect } from 'chai';
import HttpStatus from 'http-status-codes';

import { start, stop } from '../../src/server';

const request = require('supertest-as-promised')(app);

describe('server/app', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => sandbox.restore());

  describe('#start', () => {
    it('should fail to start the app if server fail to listen', async () => {
      sandbox.stub(Server.prototype, 'listen', (port, cb) => cb(new Error('Listen err')));
      let error = null;
      try {
        await start();
      }
      catch (err) {
        error = err;
      }
      finally {
        expect(error).to.not.be.null();
        expect(error).to.have.property('message', 'Listen err');
      }
    });

    it('should successfully start the app', async () => {
      const listenSpy = sandbox.spy();
      sandbox.stub(Server.prototype, 'listen', (port, cb) => {
        listenSpy();
        cb();
      });
      await app.start();

      expect(listenSpy).to.have.been.calledOnce();
    });

    it('should successfully fallback to index for non existing route', async () => {
      await app.start();
      const { statusCode, text } = await request.get('/non/existing/route');

      expect(statusCode).to.equal(HttpStatus.OK);
      expect(text).to.contain('<div id="app">');
    });
  });

  describe('#stop', () => {
    it('should fail to stop the server if server fail to close', async () => {
      sandbox.stub(Server.prototype, 'close', cb => cb(new Error('Close err')));
      let error = null;
      try {
        await app.stop();
      }
      catch (err) {
        error = err;
      }
      finally {
        expect(error).to.not.be.null();
        expect(error).to.have.property('message', 'Close err');
      }
    });

    it('should successfully stop the server', async () => {
      const closeSpy = sandbox.spy();
      sandbox.stub(Server.prototype, 'close', (cb) => {
        closeSpy();
        if (cb) { cb(); }
      });
      await app.stop();

      expect(closeSpy).to.have.been.calledTwice();
    });
  });
});
