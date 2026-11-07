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

test('removing a post removes it from the list', () => {
  const service = createSummitPostsService();
  const post = service.create({ body: 'Hello Summit', community: 'technology' });
  assert.deepEqual(service.list(), [post]);

  service.remove(post.id);

  assert.deepEqual(service.list(), []);
});
