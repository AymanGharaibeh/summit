import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(
  new URL('../../src/services/summitPostsService.ts', import.meta.url),
  'utf8',
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const { createSummitPostsService } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

test('deleting a comment removes it and resets the comment count', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });
  const comment = service.comment(post.id, 'Great post!');
  assert.equal(service.get(post.id).commentCount, 1);
  assert.deepEqual(service.comments(post.id), [comment]);

  service.removeComment(post.id, comment.id);

  assert.deepEqual(service.comments(post.id), []);
  assert.equal(service.get(post.id).commentCount, 0);
});
