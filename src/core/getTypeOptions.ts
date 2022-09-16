import { getTypeString } from "./typeStringGenerator"

interface TypeOption {
  type: string,
}

interface InterfaceOption {
  [index: string]: TypeOption
}

export const getTypeOption = (typeDto) => {
  const res: InterfaceOption = {}
  if (typeDto.children) {
    for(let child of typeDto.children) {
      const childInfo = {
        type: getTypeString(child.type)
      }
      res[child.name] = childInfo
    }
  } 
  return res
}