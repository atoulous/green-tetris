import sinon from 'sinon';
import { expect } from 'chai';
import HttpStatus from 'http-status-codes';
import request from 'supertest';

import * as app from '../../src/server';

describe('server/app', () => {
  const sandbox = sinon.sandbox.create();

  beforeEach(() => sandbox.restore());

  describe('#start', () => {
    it('should successfully start the app', async () => {
      const { statusCode, text } = await request(app).get('/');

      expect(statusCode).to.equal(HttpStatus.OK);
      expect(text).to.contain('<div id="app">');
    });

    it('should successfully fallback to index for non existing route', async () => {
      const { statusCode, text } = await request(app).get('/non/existing/route');

      expect(statusCode).to.equal(HttpStatus.OK);
      expect(text).to.contain('<div id="app">');
    });
  });

  describe('#stop', () => {
    it('should successfully stop the server', async () => {
      const { statusCode, text } = await request(app).get('/non/existing/route');

      expect(statusCode).to.equal(HttpStatus.OK);
      expect(text).to.contain('<div id="app">');
    });
  });
});
