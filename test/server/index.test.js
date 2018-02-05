import sinon from 'sinon';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import { server, app, start, stop } from '../../src/server';
import logger from '../../src/server/helpers/logger';

describe('server/app', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    jest.restoreAllMocks();
    sandbox.restore();
  });

  describe('#start', () => {
    it('should fail to start the app if server fail to listen', async () => {
      const error = new Error('Listen err');
      sandbox.stub(server, 'listen').throws(error);
      const loggerSpy = jest.spyOn(logger, 'error');

      await start();
      expect(loggerSpy).toHaveBeenCalledWith(error, '✘ An error happened at start');
    });

    it('should successfully start the app', async () => {
      const loggerSpy = jest.spyOn(logger, 'info');
      sandbox.stub(server, 'listen');
      await start();
      expect(loggerSpy).toHaveBeenCalledWith('✔ Server running on port', app.get('port'));
    });

    it('should successfully fallback to index for non existing route', async () => {
      sandbox.stub(server, 'listen');
      await start();
      const { statusCode, text } = await request(app).get('/non/existing/route');
      expect(statusCode).toEqual(HttpStatus.OK);
      expect(text).toContain('<div id="app">');
    });
  });

  describe('#stop', () => {
    // it('should fail to stop the server if server fail to close', async () => {
    //   const error = new Error('Close err');
    //   sandbox.stub(server, 'close').throws(error);
    //   const loggerSpy = jest.spyOn(logger, 'error');
    //
    //   await stop();
    //   expect(loggerSpy).toHaveBeenCalledWith(error, '✘ An error happened at stop');
    // });

    it('should successfully stop the server', async () => {
      const loggerSpy = jest.spyOn(logger, 'info');
      sandbox.stub(server, 'close');

      await stop();
      expect(loggerSpy).toHaveBeenCalledWith('✔ Server stopped');
    });
  });
});
