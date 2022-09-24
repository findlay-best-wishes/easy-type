import { Comment, DeclarationReflection } from "typedoc"
import { TargetNode } from "../utils/tools"
import { getTypeString } from "./typeStringGenerator"

export interface TypeOption {
  name: string,
  type: string,
  comment?: Comment
}

export const getTypeOptionFromNode = (node: TargetNode): Array<TypeOption> | TypeOption | null => {
  if (node.children) {
    let res: Array<TypeOption> = []
    for(let child of node.children) {
      const childInfo = {
        name: child.name,
        type: getTypeString(child.type),
        comment: child.comment
      }
      res.push(childInfo)
    }
    return res
  }
  if (node instanceof DeclarationReflection) {
    const res: TypeOption = {
      name: node.name,
      type: getTypeString(node.type),
      comment: node.comment
    }
    return res
  }
  return null
}