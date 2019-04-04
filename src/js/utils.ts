export function add() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("finish")
    }, 1000)
  })
}
