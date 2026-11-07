import assert from 'node:assert/strict';
import test from 'node:test';

test('GET /api/ping/server returns status 200', async () => {
  const response = await fetch('http://localhost:3000/api/ping/server');
  assert.equal(response.status, 200);
});
