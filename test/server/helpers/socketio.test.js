import { Server } from 'http';
import Express from 'express';

import * as socketio from '../../../src/server/helpers/socketio';

describe('server/helpers/socketio', () => {
  describe('#listen', () => {
    const server = Server(new Express());

    afterEach(async () => {
      await new Promise(resolve => socketio.close(resolve));
    });

    it('should plug socketio to an http server', async () => {
      const connection = socketio.listen(server);

      expect(connection).not.toBeNull();
    });
  });

  describe('#getConnection', () => {
    it('should get the socketio connection', async () => {
      const io = socketio.listen(Server(Express()));
      const connection = socketio.getConnection();

      expect(connection).not.toBeNull();
      expect(connection).toEqual(io);
    });
  });

  describe('#close', () => {
    it('should close the socketio connection', async () => {
      socketio.listen(Server(Express()));

      let error;
      try {
        await new Promise(resolve => socketio.close(resolve));
      } catch (err) {
        error = err;
      }

      expect(error).toBeUndefined();
      expect(socketio.getConnection()).toBeNull();
    });

    it('should not close the socketio connection (no connection was created)', async () => {
      let error;
      try {
        await new Promise(resolve => socketio.close(resolve));
      } catch (err) {
        error = err;
      }

      expect(error).toBeUndefined();
      expect(socketio.getConnection()).toBeNull();
    });
  });
});
