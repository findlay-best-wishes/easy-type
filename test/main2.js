import getTypeInfo from '../dist/index.js'

getTypeInfo({
  entryFile: 'test/test.ts',
  typeName: 'Func1',
  tsconfig: 'tsconfig.json'
})