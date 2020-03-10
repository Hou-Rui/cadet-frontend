import { parse } from 'acorn';
import { FunctionExpression, Node } from 'estree';
import Closure from 'js-slang/interpreter/closure';
import createContext from 'js-slang/createContext';
import { Context, Environment } from 'js-slang/types';
import { TypeError } from 'js-slang/utils/rttc';

export function mockContext(chapter = 1): Context {
  return createContext(chapter);
}

export function mockRuntimeContext(): Context {
  const context = createContext();
  // Note: noticed no harm in removing the following context.runtime.
  // If you get an error with head is undefined after trying to evaluate code.
  // Likely due to the environments: [].
  // In every real context, there is at least one env frame.
  context.runtime = {
    break: false,
    debuggerOn: true,
    isRunning: true,
    environments: [],
    nodes: [
      {
        type: 'Literal',
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 1, column: 1 }
        },
        value: 0,
        raw: '0',
        range: [0, 1]
      }
    ]
  };
  return context;
}

export function mockClosure(): Closure {
  return new Closure({} as FunctionExpression, {} as Environment, {} as Context);
}

export function mockTypeError(): TypeError {
  // Typecast to Node to fix estree-acorn compatability.
  return new TypeError(parse('') as Node, '', '', '');
}
