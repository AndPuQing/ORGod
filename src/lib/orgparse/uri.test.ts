import assert from 'node:assert';
import { describe, it } from 'node:test';

import parseLink from './uri';

describe('Parsing Link', () => {
  it('recon local file', () => {
    assert.deepEqual(parseLink(`file:/hello.org`), {
      protocol: 'file',
      search: undefined,
      value: '/hello.org',
    });

    assert.deepEqual(parseLink(`./hello.org`), {
      protocol: 'file',
      search: undefined,
      value: './hello.org',
    });

    assert.deepEqual(parseLink(`./hello.org::23`), {
      protocol: 'file',
      search: 23,
      value: './hello.org',
    });
    assert.deepEqual(parseLink(`./hello.org::*shopping list`), {
      protocol: 'file',
      search: '*shopping list',
      value: './hello.org',
    });
    assert.deepEqual(parseLink(`./hello.org::apple pie`), {
      protocol: 'file',
      search: 'apple pie',
      value: './hello.org',
    });
  });

  it('recon other protocol', () => {
    assert.deepEqual(parseLink(`http://google.com`), {
      protocol: 'http',
      search: undefined,
      value: 'http://google.com',
    });
    assert.deepEqual(parseLink(`mailto:dawnstar.hu@gmail.com`), {
      protocol: 'mailto',
      search: undefined,
      value: 'dawnstar.hu@gmail.com',
    });
  });
});
