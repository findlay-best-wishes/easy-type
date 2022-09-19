const { getTypeOption, getTypeOptionByProject } = require('../dist/src/index')

getTypeOption({
  entryFile: 'test/test.ts',
  typeName: 'A',
  tsconfig: 'tsconfig.json'
}).then(res => {
  console.log('res is ', res)
})

// const res = getTypeOptionByProject({
//   entryFile: 'test/test.ts',
//   typeName: 'A',
//   tsconfig: 'tsconfig.json'
// })

// console.log('--------------')
// console.log(res)