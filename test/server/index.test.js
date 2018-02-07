import sinon from 'sinon';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import { server, app, start, stop } from '../../src/server';
import logger from '../../src/server/helpers/logger';
import * as socketio from '../../src/server/helpers/socketio';

describe('server/app', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    jest.restoreAllMocks();
    sandbox.restore();
  });

  describe('#start', () => {
    beforeEach(async () => {
      sandbox.stub(socketio, 'listen');
    });

    it('should fail to start the app if server fail to listen', async () => {
      const error = new Error('Listen err');
      jest.spyOn(server, 'listen').mockImplementation(() => { throw error; });

      const loggerSpy = jest.spyOn(logger, 'error');

      await start();
      expect(loggerSpy).toHaveBeenCalledWith(error, '✘ An error happened at start');
    });

    it('should successfully start the app', async () => {
      const loggerSpy = jest.spyOn(logger, 'info');
      jest.spyOn(server, 'listen').mockImplementation((port, cb) => cb());

      await start();
      expect(loggerSpy).toHaveBeenCalledWith('✔ Server running on port', app.get('port'));
    });

    it('should successfully fallback to index for non existing route', async () => {
      jest.spyOn(server, 'listen').mockImplementation((port, cb) => cb());

      await start();
      const { statusCode, text } = await request(app).get('/non/existing/route');
      expect(statusCode).toEqual(HttpStatus.OK);
      expect(text).toContain('<div id="app">');
    });
  });

  describe('#stop', () => {
    beforeEach(async () => {
      // start server faked, server.listen do nothing here because of jest mock
      jest.spyOn(server, 'listen').mockImplementation((port, cb) => cb());

      sandbox.stub(socketio, 'close');
      await start();
    });

    it('should fail to stop the server if server fail to close', async () => {
      const error = new Error('Close err');

      // mock server.close and throw error in it
      jest.spyOn(server, 'close').mockImplementation(() => { throw error; });

      // create spy logger
      const loggerSpy = jest.spyOn(logger, 'error');

      // stop the server
      await stop();

      expect(loggerSpy).toHaveBeenCalledWith(error, '✘ An error happened at stop');
    });

    it('should successfully stop the server', async () => {
      const loggerSpy = jest.spyOn(logger, 'info');
      jest.spyOn(server, 'close').mockImplementation(cb => cb());

      await stop();
      expect(loggerSpy).toHaveBeenCalledWith('✔ Server stopped');
    });
  });
});
