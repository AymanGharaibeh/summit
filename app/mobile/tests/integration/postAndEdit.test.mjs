import assert from 'node:assert/strict';
import test from 'node:test';
import { createSummitPostsService } from '../../src/services/summitPostsService.ts';

test('creates a post, edits it, and retrieves the updated post', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });
  const originalId = post.id;

  service.update(originalId, {
    body: 'Hello Summit Updated',
    community: 'technology',
  });
  const updated = service.get(originalId);

  assert.equal(updated.body, 'Hello Summit Updated');
  assert.equal(updated.id, originalId);
});
