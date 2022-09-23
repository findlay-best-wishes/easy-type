const { getTypeOption } = require('../dist/src/index')


const res = getTypeOption({
  entryFile: 'test/test.ts',
  typeName: ['C', 'T1'],
  tsconfig: 'tsconfig.json'
})

console.log('--------------')
console.log(res)