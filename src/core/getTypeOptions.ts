import { type } from "os"
import { ContainerReflection, ParameterReflection, SignatureReflection, Type, TypeParameterReflection } from "typedoc"
import { getTypeString } from "./typeStringGenerator"

export interface TypeOption {
  type: string,
}

export type Token = ContainerReflection &
  ParameterReflection &
  SignatureReflection & 
  TypeParameterReflection
export const getTypeOption = (typeDto: Token): Array<TypeOption> | TypeOption | null => {
  if (typeDto.children) {
    let res: Array<TypeOption> = []
    for(let child of typeDto.children) {
      const childInfo = {
        type: getTypeString(child.type)
      }
      res.push(childInfo)
    }
    return res
  }
  if (typeDto.type) {
    const res: TypeOption = {
      type: getTypeString(typeDto.type)
    }
    res.type = getTypeString(typeDto.type)
    return res
  }
  return null
}