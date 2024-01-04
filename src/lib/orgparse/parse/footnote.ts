import { FootnoteLabel } from '../types.js';
import { Action } from './index.js';

const Footnote: Action = (token: FootnoteLabel, { enter, exitTo, consume }) => {
  exitTo('document');
  enter({
    type: 'footnote',
    label: token.label,
    children: [],
  });
  consume();
};

export default Footnote;
