import { expect, test } from 'vitest'
import { deduplicate } from '../src/utils/text-deduplication'
import { segmentWithEn, segmentWithZh } from '../src/utils/text-segment';
import { extractWithEn, extractWithZh } from '../src/utils/text-extraction';
import { getDict } from '../src/utils/data'

test('deduplicate', () => {
  const data = ['1', '1', '2', '2', '3']
  const result = ['1', '2', '3']
  expect(deduplicate(data)).toEqual(result)
})

test('segment', () => {
  expect(segmentWithEn('hello world')).toEqual(['hello', 'world'])
  expect(segmentWithZh('你好世界')).toEqual(['你好', '世界'])
})

test('extract', () => {
  const data = [{ chinese: '我', english: 'I', soundmark: '/aɪ/' }]
  expect(extractWithEn(data)).toEqual(['I'])
  expect(extractWithZh(data)).toEqual(['我'])
})

test('data', async () => {
  const data = await getDict()
  console.log(data);
})