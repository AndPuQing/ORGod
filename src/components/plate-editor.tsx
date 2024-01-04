'use client';

import { useState } from 'react';
import { createPlugins, Plate, Value } from '@udecode/plate-common';

import { Editor } from '@/components/plate-ui/editor';

const { parse } = require('orga');
const plugins = createPlugins([], {
  components: {},
});

type OrgaASTNode = {
  type: string;
  properties: {};
  children: OrgaASTNode[];
  position: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
};

export const basicEditorValue = [
  { type: 'p', children: [{ text: 'Type your message here.' }] },
];

export function PlateEditor() {
  const [value, setValue] = useState<Value>(basicEditorValue);
  let val = parse(`** remember the milk`) as OrgaASTNode;
  val = val.children[0];
  return (
    <Plate
      plugins={plugins}
      initialValue={basicEditorValue}
      onChange={(newValue) => {
        setValue(value);
      }}
    >
      <Editor placeholder="Type your message here." />
      <pre>{JSON.stringify(val, null, 2)}</pre>
    </Plate>
  );
}
