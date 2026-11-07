import assert from 'node:assert/strict';
import test from 'node:test';
import { createSummitPostsService } from '../../src/services/summitPostsService.ts';

test('creates a post and retrieves its comment', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });

  service.comment(post.id, 'Nice post!');
  const comments = service.comments(post.id);
  const comment = comments.find((item) => item.body === 'Nice post!');

  assert.ok(comment);
  assert.equal(comment.postId, post.id);
});
