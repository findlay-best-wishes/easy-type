type CallbackInTranverse = (node, quit) => void

// 层序遍历
export const tranverse = (node, cb: CallbackInTranverse) => {
  if (!node) return
  let isQuit = false
  const quit = () => isQuit = true

  const queue = [node]
  while(queue.length) {
    const currrentNode = queue.shift()
    const resCb = cb(currrentNode, quit)
    if (isQuit) return resCb
    if (currrentNode.children) {
      for(let child of currrentNode.children) {
        queue.push(child)
      }
    }
  }
}

export const findTypeTokenByName = (name: string): CallbackInTranverse => {
  return function (node, quit) {
    if (node.name === name) {
      quit()
      return node
    }
  }
}