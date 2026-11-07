import assert from 'node:assert/strict';
import test from 'node:test';
import { createSummitPostsService } from '../../src/services/summitPostsService.ts';

test('creates a post, upvotes it, and retrieves the updated vote count', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });
  assert.equal(post.voteCount, 0);

  service.vote(post.id, 1);
  const retrievedPost = service.get(post.id);

  assert.equal(retrievedPost.voteCount, 1);
});
