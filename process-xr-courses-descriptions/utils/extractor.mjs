import fs from 'fs';
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

export const extractDescription = (list) => {
  let pptStart = false
  const timestampRule = /^\d\d(:\d\d){1,2}/
  const descriptions = list.filter((line, index) => {
    if (index === 0) pptStart = false
    if (line.includes('提取PPT')) pptStart = true
    return (!pptStart && timestampRule.test(line))
  })
  let validDescriptions = []
  descriptions.forEach((line) => {
    const timestamp = timestampRule.exec(line)[0]
    const text = line.slice(timestamp.length, line.length).trim()
    if (!config.descriptions.excludes.some(str => text.includes(str))) {
      const item = { timestamp, text }
      validDescriptions.push(item)
    }
  })
  return validDescriptions
}

export const extractKeywords = (list) => {
  const index = list.findIndex(line => line.includes('关键词'))
  let keywords = []
  if (index > -1) {
    const keywordsLine = list[index + 1]
    keywords = keywordsLine.split(',').filter(keyword => !config.keywords.excludes.includes(keyword.trim())).map(keyword => keyword.trim())
  }
  return keywords
}