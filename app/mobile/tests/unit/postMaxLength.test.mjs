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
const { validatePost } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

test('validatePost rejects a message exceeding 10000 characters', () => {
  assert.throws(
    () => validatePost({ body: 'a'.repeat(10001), community: 'technology' }),
    { name: 'Error', message: 'Post content must be 10000 characters or fewer.' },
  );
});
