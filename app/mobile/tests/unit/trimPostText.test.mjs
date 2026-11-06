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

test('validatePost trims leading and trailing spaces from a valid message', () => {
  const result = validatePost({
    body: '  A valid  message  ',
    community: 'technology',
  });

  assert.equal(result.body, 'A valid  message');
});
