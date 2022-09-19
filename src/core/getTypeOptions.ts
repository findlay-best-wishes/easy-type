import { Comment, ContainerReflection, ParameterReflection, SignatureReflection, Type, TypeParameterReflection } from "typedoc"
import { getTypeString } from "./typeStringGenerator"

export interface TypeOption {
  name: string,
  type: string,
  comment?: Comment
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
        name: child.name,
        type: getTypeString(child.type),
        comment: child.comment
      }
      res.push(childInfo)
    }
    return res
  }
  if (typeDto.type) {
    const res: TypeOption = {
      name: typeDto.name,
      type: getTypeString(typeDto.type),
      comment: typeDto.comment
    }
    res.type = getTypeString(typeDto.type)
    return res
  }
  return null
}