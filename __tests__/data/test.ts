/**
 * @defaultValue defaultValue
 */
export type str = string

export type ArrayNum = Array<number>

export type Conditional<T> = T extends Array<any> ? Array<any> : 'non-array'

export type IndexedAccess = I1['name']

export type Inferred<T extends Array<string>> = T extends Array<infer I> ? I : any

export type Intersection = 'a' | number | ArrayNum

export type LiteralStr = 'str'

export type LiteralNum = 1

export type Mapped<T extends object> = {
  [k in keyof T as string]: T[k]
}

export type MappedReadonly<T extends object> = {
  readonly [k in keyof T]: T[k]
}

export type MappedOmitReadonly<T extends object> = {
  -readonly [k in keyof T]: T[k]
}

export type MappedOptional<T extends object> = {
  [k in keyof T]?: T[k]
}

export type MappedRequired<T extends object> = {
  [k in keyof T]-?: T[k]
}

// named-tuple-membe

const a = 'a'
export type QueryA = typeof a

// export type Rested<A extends Array<any>> = {
//   a: [...A]
// }

export type TemplateLiteral = `the type is ${QueryA}`

export type Tuple = [string, number, I1]

export type Union = string | number | I1

export type Unknown = unknown

export interface I1 {
  name: str
  type: LiteralStr
  age: LiteralNum
  money: ArrayNum
}