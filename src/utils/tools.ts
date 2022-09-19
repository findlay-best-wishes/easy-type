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