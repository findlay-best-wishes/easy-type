[简体中文](./Readme.zh.md) | [EN](../Readme.md)

获取 typescript 工程中某个类型的信息，比如类型的字符表示及对应的 jsdoc comment。

# 安装

``` shell
npm install @findlay-best-wishes/easy-type
```

# 用法

```javascript
const { getTypeOption } = require('@findlay-best-wishes/easy-type')

const { name, type, comment } = getTypeOption({
  entryFile: 'test.ts',
  typeName: 'Props'
  tsconfig: 'tsconfig'
})
```

```javascript
// 获取多个类型信息
const { getTypeOption } = require('@findlay-best-wishes/easy-type')

const { Props, State } = getTypeOption({
  entryFile: 'button.ts',
  typeName: ['Props', 'State']
  tsconfig: 'tsconfig'
})
```
