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

test('validatePost accepts a message with a valid community', () => {
  const result = validatePost({ body: 'Hello Summit', community: 'technology' });

  assert.equal(result.body, 'Hello Summit');
  assert.equal(result.community, 'technology');
});
