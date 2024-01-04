import assert from 'node:assert';
import { describe, it } from 'node:test';

import createTodoKeywordSet from './todo-keyword-set';

const _debug = (text: string) => {
  const tks = createTodoKeywordSet(text);
  console.log(`${text}:`, tks);
};

describe('TodoKeywordSet', () => {
  it('works', () => {
    assert.deepEqual(createTodoKeywordSet('TODO | DONE'), {
      actionables: ['TODO'],
      done: ['DONE'],
      keywords: ['TODO', 'DONE'],
    });
    assert.deepEqual(createTodoKeywordSet('TODO DONE'), {
      actionables: ['TODO'],
      done: ['DONE'],
      keywords: ['TODO', 'DONE'],
    });
    assert.deepEqual(createTodoKeywordSet(' TODO NEXT  |  DONE '), {
      actionables: ['TODO', 'NEXT'],
      done: ['DONE'],
      keywords: ['TODO', 'NEXT', 'DONE'],
    });
    assert.deepEqual(createTodoKeywordSet('TODO NEXT DONE'), {
      actionables: ['TODO', 'NEXT'],
      done: ['DONE'],
      keywords: ['TODO', 'NEXT', 'DONE'],
    });
    assert.deepEqual(createTodoKeywordSet('TODO | DONE CANCELLED'), {
      actionables: ['TODO'],
      done: ['DONE', 'CANCELLED'],
      keywords: ['TODO', 'DONE', 'CANCELLED'],
    });
  });
});
