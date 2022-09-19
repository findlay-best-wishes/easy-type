import { ContainerReflection } from "typedoc"
import { Token } from "../core/getTypeOptions"

type CallbackInTranverse = (node: Token, quit: () => void) => void

// 层序遍历
export const tranverse= (node?: Token, cb?: CallbackInTranverse): ReturnType<CallbackInTranverse> | undefined => {
  if (node && cb) {
    let isQuit = false
    const quit = () => isQuit = true
    console.log(node)
    const queue = [node]
    while(queue.length) {
      const currrentNode = queue.shift() as Token
      const resCb = cb(currrentNode, quit)
      if (isQuit) return resCb
      if (currrentNode.children) {
        for(let child of currrentNode.children) {
          // @ts-ignore
          queue.push(child)
        }
      }
    }
  }
  
}

export const findTypeTokenByName = (name: string): CallbackInTranverse => {
  return function (node, quit) {
    if (node?.name === name) {
      quit()
      return node
    }
  }
}