import { ContainerReflection } from "typedoc"
import { getTypeOption as getTypeOptionScoped, TypeOption } from "./core/getTypeOptions"
import { getTypeTokens } from "./core/getTypeTokens"
import { findTypeTokenByName, tranverse } from "./utils/tools"

interface Option {
  entryFile: string
  typeName: string
  tsconfig: string
}

export async function getTypeOption(option: Option): Promise<Array<TypeOption> | TypeOption | null> {
  const { entryFile, typeName, tsconfig } = option
  const typeTokens = await getTypeTokens({ entryFile, tsconfig })
  if (typeTokens) {
    const targetTypeToken = tranverse(typeTokens, findTypeTokenByName(typeName))
    if (targetTypeToken) {
      return getTypeOptionScoped(targetTypeToken)
    } 
  }

  return null
}