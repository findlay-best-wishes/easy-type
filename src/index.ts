import { getTypeOptionFromNode, TypeOption } from "./core/getTypeOptions"
import { getTypeProject } from "./core/getProject"
import { tranverse } from "./utils/tools"
import { TargetNode } from './utils/tools'

interface Option {
  entryFile: string
  typeName: string | string[]
  tsconfig: string
}
type GetTypeOption = (option: Option) => Record<string, Array<TypeOption> | TypeOption | null> | null
export const getTypeOption: GetTypeOption = (option) => {
  const { entryFile, typeName, tsconfig } = option
  const typeNames = Array.isArray(typeName) ? typeName : [typeName]
  const { project } = getTypeProject({ entryFile, tsconfig })
  if (project) {
    const name2Idx = typeNames.reduce((accu, name: string, i) => {
      accu[name] = i
      return accu
    }, {} as Record<string, number>)
    const targetNodes: TargetNode[] = []
    tranverse(project, (node, stop) => {
      if (name2Idx[node.name] > -1) {
        targetNodes.push(node)
        if (targetNodes.length === typeNames.length) stop()
      }
    })

    return targetNodes.reduce((accu, node: TargetNode) => {
      accu[node.name] = getTypeOptionFromNode(node)
      return accu
    }, {} as Exclude<ReturnType<GetTypeOption>, null>)
  }

  return null
}