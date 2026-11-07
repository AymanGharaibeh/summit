import app from '../../src/app';
import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';

test('GET /api/ping/server returns status 200', async () => {
  const response = await request(app).get('/api/ping/server');
  assert.equal(response.status, 200);
});
