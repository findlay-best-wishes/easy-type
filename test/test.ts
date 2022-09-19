
export type Func1 = (a: string) => void

export interface T1 {
  /**
   * @defaultValue 1
   */
  a: number
  c: string
}

/**
 * @description sfsfsfsfsfs
 */
export interface I {
  /**
   * @defaultValue 1 | 3
   * @defaultValue 2
   */
  readonly a: string,
  b: null
  c: T1
}

export type A = Array<string>

export type B = string