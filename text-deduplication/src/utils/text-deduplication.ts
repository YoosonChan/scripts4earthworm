export function deduplicate(data: string[]) {
  let result: string[] = []
  if (data.length && data instanceof Array) {
    result = [...new Set(data)]
  }
  return result
}