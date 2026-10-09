/**
 * 获取命令行参数
 * vite -- --module hs
 */
export function parseArgv() {
  const args = process.argv.slice(2)
  const result = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    // --key=value
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=')
      if (value !== undefined) {
        // 有等号
        result[key] = value
      } else {
        // 看下一个参数是不是值，不是就设为true（布尔）
        const nextArg = args[i + 1]
        if (nextArg && !nextArg.startsWith('-')) {
          result[key] = nextArg
          i++
        } else {
          result[key] = true
        }
      }
    }
  }
  return result
}