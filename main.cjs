const { getTypeOption } = require('./dist/index.cjs')

console.log('getTypeOption', getTypeOption)
getTypeOption({
  entryFile: 'test/test.ts',
  typeName: 'I',
  tsconfig: 'tsconfig.json'
}).then(res => {
  console.log('res is ', res)
})