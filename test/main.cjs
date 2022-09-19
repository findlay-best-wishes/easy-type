const { getTypeOption } = require('../dist/src/index')

console.log('getTypeOption', getTypeOption)
getTypeOption({
  entryFile: 'test/test.ts',
  typeName: 'I',
  tsconfig: 'tsconfig.json'
}).then(res => {
  console.log('res is ', res)
})