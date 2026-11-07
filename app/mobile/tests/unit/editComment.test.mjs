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

test('editing a comment updates its body and preserves its ID', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });
  const comment = service.comment(post.id, 'Great post!');
  const originalId = comment.id;

  service.updateComment(post.id, originalId, 'Very interesting post!');
  const comments = service.comments(post.id);

  assert.equal(comments.length, 1);
  assert.equal(comments[0].body, 'Very interesting post!');
  assert.equal(comments[0].id, originalId);
});
