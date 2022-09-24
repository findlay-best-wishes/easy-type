
describe('getTypeOption', () => {
  const { getTypeOption } = require('../dist')
  const typeNames = [
    'str',
    'ArrayNum',
    'Conditional',
    'IndexedAccess',
    'Inferred',
    'Intersection',
    'LiteralStr',
    'LiteralNum',
    'Mapped',
    'MappedReadonly',
    'MappedOmitReadonly',
    'MappedOptional',
    'MappedRequired',
    'QueryA',
    'Rested',
    'TemplateLiteral',
    'Tuple',
    'Union',
    'Unknown',
    'I1'
  ]
  const {
    str,
    ArrayNum,
    Conditional,
    IndexedAccess,
    Inferred,
    Intersection,
    LiteralStr,
    LiteralNum,
    Mapped,
    MappedReadonly,
    MappedOmitReadonly,
    MappedOptional,
    MappedRequired,
    QueryA,
    Rested,
    TemplateLiteral,
    Tuple,
    Union,
    Unknown,
    I1
  } = getTypeOption({
    entryFile: '__tests__/data//test.ts',
    typeName: typeNames, 
    tsconfig: 'tsconfig.test.json'
  })

  test('should get type option', () => {
    expect(str.type).toBe('string')

    const defaultTagInfo = str.comment.getTag('@defaultValue')
    expect(defaultTagInfo.tag).toEqual('@defaultValue')
    
    expect(defaultTagInfo.content[0]).toEqual({kind: 'text', text: 'defaultValue'})

    expect(ArrayNum.type).toBe('Array<number>')

    expect(Conditional.type).toBe("T extends Array<any> ? Array<any> : 'non-array'")

    expect(IndexedAccess.type).toBe("I1['name']")

    expect(Inferred.type).toBe("T extends Array<infer I> ? I : any")

    expect(Intersection.type).toBe("'a' | number | ArrayNum")

    expect(LiteralStr.type).toBe("'str'")

    expect(LiteralNum.type).toBe("'1'")

    expect(Mapped.type).toBe("{ [k in keyof T as string]: T[k] }")

    expect(MappedReadonly.type).toBe("{ readonly [k in keyof T]: T[k] }")

    expect(MappedOmitReadonly.type).toBe("{ -readonly [k in keyof T]: T[k] }")
  
    expect(MappedOptional.type).toBe("{ [k in keyof T]?: T[k] }")

    expect(MappedRequired.type).toBe("{ [k in keyof T]-?: T[k] }")

    expect(QueryA.type).toBe("typeof a")

    // expect(Rested.type).toBe("{ a: [...A] }")

    expect(TemplateLiteral.type).toBe("`the type is ${QueryA}`")

    expect(Tuple.type).toBe("[string, number, I1]")

    expect(Union.type).toBe("string | number | I1")

    expect(Unknown.type).toBe("unknown")
    
    expect(I1).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'name',
          type: 'string',
          comment: undefined
        }),
        expect.objectContaining({
          name: 'type',
          type: "'str'",
          comment: undefined,
        }),
        expect.objectContaining({
          name: 'age',
          type: "'1'",
          comment: undefined
        }),
        expect.objectContaining({
          name: 'money',
          type: 'ArrayNum',
          comment: undefined
        }),  
      ])
    )
  })
})