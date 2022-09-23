import { ContainerReflection, DeclarationReflection, ProjectReflection } from "typedoc"

export type TargetNode = ProjectReflection | DeclarationReflection
type CallbackInTranverse<T extends any = any> = (node: TargetNode, quit: () => void) => T

// 层序遍历
export const tranverse = (node?: ProjectReflection, cb?: CallbackInTranverse): ReturnType<CallbackInTranverse> | undefined => {
  if (node && cb) {
    let isQuit = false
    const quit = () => isQuit = true
    const queue: Array<ProjectReflection | DeclarationReflection> = [node]

    while(queue.length) {
      const currrentNode = queue.shift() as (ProjectReflection | DeclarationReflection)
      const returnValueCb = cb(currrentNode, quit)
      if (isQuit) return returnValueCb
      if (currrentNode.children) {
        for(let child of currrentNode.children) {
          queue.push(child)
        }
      }
    }

  }
}

export const findTypeNodeByName = (name: string): CallbackInTranverse<TargetNode | undefined> => {
  return function (node: TargetNode, quit: () => void) {
    if (node.name === name) {
      quit()
      return node
    }
  }
}

// export const findTypeNodesByNames = (names: string[]): CallbackInTranverse<Array<TargetNode | null> | undefined> => {
//   const numsFound = 0
//   const reg: Array<TargetNode | null> = new Array(names.length).fill(null)
//   const name2Idx = names.reduce((accu, name: string, i) => {
//     accu[name] = i
//     return accu
//   }, {} as Record<string, number>)

//   return function (node: TargetNode, quit: () => void) {
//     if (name2Idx[node.name] > 0) {

//     }
//     if (numsFound === names.length) {
//       return reg
//     }
//   }
// }