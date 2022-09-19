const { getTypeOption } = require('../dist/src/index')


const res = getTypeOption({
  entryFile: 'test/test.ts',
  typeName: 'C',
  tsconfig: 'tsconfig.json'
})

console.log('--------------')
console.log(res)