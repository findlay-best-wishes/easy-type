import { getTypeOption } from "./core/getTypeOptions"
import { getTypeTokens } from "./core/getTypeTokens"
import { findTypeTokenByName, tranverse } from "./utils/tools"

interface Option {
  entryFile: string
  typeName: string
}

export default async function (option: Option) {
  const { entryFile, typeName } = option
  const typeTokens = await getTypeTokens({ entryFile })
  const targetTypeToken = tranverse(typeTokens, findTypeTokenByName(typeName))
  const typeOption = getTypeOption(targetTypeToken)
  return typeOption
}