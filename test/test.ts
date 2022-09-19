
export type Func1 = (a: string) => void

interface T1 {
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

type A = Array<string>