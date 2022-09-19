import { ContainerReflection } from "typedoc"
import { getTypeOptionFromNode, TypeOption } from "./core/getTypeOptions"
import { getTypeProject } from "./core/getProject"
import { findTypeNodeByName, tranverse } from "./utils/tools"

interface Option {
  entryFile: string
  typeName: string
  tsconfig: string
}

export function getTypeOption(option: Option): Array<TypeOption> | TypeOption | null {
  const { entryFile, typeName, tsconfig } = option
  const { project } = getTypeProject({ entryFile, tsconfig })
  if (project) {
    const targetNode = tranverse(project, findTypeNodeByName(typeName))
    if (targetNode) {
      return getTypeOptionFromNode(targetNode)
    } 
  }

  return null
}