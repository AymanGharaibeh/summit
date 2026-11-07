import app from '../../src/app';
import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';

test('GET /api/ping/server returns server status and a valid timestamp', async () => {
  const response = await request(app).get('/api/ping/server');

  assert.equal(response.status, 200);
  assert.equal(response.body.result, 'server ok');
  assert.equal(typeof response.body.timestamp, 'string');
  assert.ok(Number.isFinite(Date.parse(response.body.timestamp)));
});
