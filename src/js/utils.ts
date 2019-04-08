export function add(text: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(text)
    }, 1000)
  })
}
