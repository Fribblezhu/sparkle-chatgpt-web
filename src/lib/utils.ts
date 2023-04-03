export const uuid = function (len: number) {
  const char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let id = ''
  for (let i = 0; i < len; i++) {
    id += char[Math.floor(Math.random() * 10)]
  }
  return id
}
