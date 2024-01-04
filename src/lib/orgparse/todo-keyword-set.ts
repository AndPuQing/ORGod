export interface TodoKeywordSet {
  actionables: string[];
  done: string[];
  readonly keywords: string[];
}

export function createTodoKeywordSet(text: string): TodoKeywordSet {
  const actionables = text
    .split(' ')
    .map((p) => p.trim())
    .filter(String);
  const pipe = actionables.indexOf('|');
  const done = actionables.splice(pipe).filter((t) => t !== '|');

  return {
    actionables,
    done,
    get keywords(): string[] {
      return [...actionables, ...done];
    },
  };
}

export default createTodoKeywordSet;
