
export function getTypeString (typeDto) {
  const genetator = typeStringGenetator[typeDto.type]
    || (() => 'any')
  return genetator(typeDto)
}

const typeStringGenetator = {
  array: (node) => `Array<${getTypeString(node.elementType)}>`,
  conditional: (node) => {
    const checkTypeString = getTypeString(node.checkType)
    const extendsTypeString = getTypeString(node.extendsType)
    const trueTypeString = getTypeString(node.trueType)
    const falseTypeString = getTypeString(node.falseType)

    return `${checkTypeString} extends ${extendsTypeString} ? ${trueTypeString} : ${falseTypeString}`
  },
  indexedAccess: (node) => {
    let indexTypeString = getTypeString(node.indexType)
    // indexType 需要再完善
    return `${node.objectType}[${indexTypeString}]`
  },
  inferred: (node) => {
    const constraintTypeString = node.constraint
      ? ` extends ${getTypeString(node.constraint)}`
      : ''
    return `infer ${node.name}${constraintTypeString}`
  },
  intersection: (node) => {
    return node.types.reduce((accu, typeNode, i) => {
      return `${accu}${i ? '&' : ''}${getTypeString(typeNode)}`
    }, '')
  },
  intrinsic: (node) => node.name,
  literal: (node) => `'${node.value}'`,
  mapped: (node) => {
    const splits: string[] = []
    switch (node.type.readonlyModifier) {
      case "+":
          splits.push('readonly')
          break;
      case "-":
          splits.push('-readonly');
          break;
    }

    splits.push(`[${node.parameter} in ${getTypeString(node.parameterType)}`)
    if (node.nameType) {
      splits.push(` as ${getTypeString(node.nameType)}`)
    }

    splits.push(']')
    switch (node.type.optionalModifier) {
      case "+":
          splits.push('?: ');
          break;
      case "-":
          splits.push('-?: ');
          break;
      default:
          splits.push(': ');
    }

    splits.push(getTypeString(node.templateType))
    
    return `{ ${splits.join('')} }`
  },
  'named-tuple-member': (node) => {
    return `${node.name}${node.isOptional ? '?: ' : ': '}${getTypeString(node.element)}`
  },
  optional: (node) => {
    return `${getTypeString(node.elementType)}?`
  },
  predicate(node) {
    const splits: string[] = []
    if (!!node.asserts) {
      splits.push('asserts ')
    }
    splits.push(node.name)
    if (!!node.targetType) {
      splits.push(` is ${getTypeString(node.targetType)}`)
    }
  },
  query(node) {
    return `typeof ${getTypeString(node.queryType)}`
  },
  // array: (node) => {
    
  // },
  reference: (node) => {
    // 待完善
    const name = node?.reflection?.name || node.name
    if (!node.typeArguments) return name
    const argsString = node.typeArguments.reduce((accu, typeDto, i) => {
      return `${accu}${i ? ', ' : ''}${getTypeString(typeDto)}`
    }, '')
    return `${name}<${argsString}>`
  },
  // reflection(node) {
  //   // 待补充
  // },
  rest(node) {
    return `...${getTypeString(node.elementType)}`
  },
  'template-literal'(node) {
    const tailsString = node.tail.map((item) => {
      return "${" + `${getTypeString(item[0])}` + "}" + `${item[1] || ''}`
    }).join('')

    return '`' + node.type.head + tailsString + '`'
  },
  tuple(node) {
    const targetsString = node.elements.reduce((accu, item, i) => {
      return `${accu}${i ? ', ' : ''}${getTypeString(item)}`
    }, '')

    return `[${targetsString}]`
  },
  typeOperator(node) {
    return `${node.type.operator}${getTypeString(node.target)}`
  },
  union: (node) => {
    return node.types.reduce((accu, typeDto, i) => {
      return `${accu}${i ? ' | ' : ''}${getTypeString(typeDto)}`
    }, '')
  },
  unknown(node) {
    return node.name
  }
}