import { readdirSync } from 'fs'
import { extractWithEn, extractWithZh } from './text-extraction'
import { segmentWithEn, segmentWithZh } from './text-segment'
import { deduplicate } from './text-deduplication'

export async function getDict() {
  let english: string[][] = []
  let chinese: string[][] = []

  let index = 0
  for (const file of readdirSync(`${__dirname}/data`)) {
    const { default: json } = await import(`./data/${file}`)
    english.push(deduplicate(extractWithEn(json).map(sen => segmentWithEn(sen)).flat()))
    chinese.push(deduplicate(extractWithZh(json).map(sen => segmentWithZh(sen)).flat()))
    index++
  }
  return {
    english: deduplicate(english.flat()),
    chinese: deduplicate(chinese.flat())
  }
}

export async function getSentences() {
  let english: string[][] = []
  let chinese: string[][] = []
  let index = 0
  for (const file of readdirSync(`${__dirname}/data`)) {
    const { default: json } = await import(`./data/${file}`)
    english.push(extractWithEn(json))
    chinese.push(extractWithZh(json))
    index++
  }
  return { english, chinese }
}
