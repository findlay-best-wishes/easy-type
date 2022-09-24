[简体中文](./Readme.zh.md) | [EN](../Readme.md)

获取 typescript 工程中某个类型的信息，比如类型的字符表示及对应的jsdoc comment。

# 用法

``` shell
npm install easy-type
```

``` javascript
const { getTypeOption } = require('easy-type')

const { name, type, comment } = getTypeOption({
  entryFile: 'test.ts',
  typeName: 'Props'
  tsconfig: 'tsconfig'
})
```
a
``` javascript
// 获取多个类型信息
const { getTypeOption } = require('easy-type')

const { Props, State } = getTypeOption({
  entryFile: 'button.ts',
  typeName: ['Props', 'State']
  tsconfig: 'tsconfig'
})
```
