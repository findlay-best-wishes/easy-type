[EN](./Readme.md) | [简体中文](./docs/Readme.zh.md)

Gain information ( such as type or comment ) of some type from typescript project.

# Usage

```shell
npm install easy-type
```

```javascript
const { getTypeOption } = require('easy-type')

const { name, type, comment } = getTypeOption({
  entryFile: 'test.ts',
  typeName: 'Props'
  tsconfig: 'tsconfig'
})
```

```javascript
// gain mutiple type information
const { getTypeOption } = require('easy-type')

const { Props, State } = getTypeOption({
  entryFile: 'button.ts',
  typeName: ['Props', 'State']
  tsconfig: 'tsconfig'
})
```
