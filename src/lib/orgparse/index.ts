import { withDefault } from './options.js';
import { parser as _parser } from './parse/index.js';
import { parse as parseTimestamp } from './timestamp.js';
import { tokenize as _tokenize, Lexer } from './tokenize/index.js';

import type { Options } from './options.js';
import type { Parser } from './parse/index.js';
import type { Document } from './types.js';

export * from './types.js';
export { parseTimestamp, Options as ParseOptions, Parser };

export const tokenize = (
  text: string,
  options: Partial<Options> = {}
): Lexer => {
  return _tokenize(text, withDefault(options));
};

export const parse = (
  text: string,
  options: Partial<Options> = {}
): Document => {
  const parser = makeParser(text, options);
  return parser.parse();
};

export function makeParser(text: string, options: Partial<Options> = {}) {
  const { range, ..._options } = withDefault(options);
  const start = range?.start;
  const lexer = tokenize(text, {
    ..._options,
    range: start ? { start, end: Infinity } : undefined,
  });
  return _parser(lexer, { ..._options, range });
}
