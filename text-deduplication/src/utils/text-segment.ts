import { cut } from 'nodejieba';

export function segmentWithEn(text: string) {
  let result: string[] = []
  if (text.length && typeof text === 'string') {
    result = text.toLocaleLowerCase().split(' ')
    // NOTE - handle punctuation marks and numbers
    result = result.filter(word => !(/[；（）0-9]+/.test(word)))
  }
  return result
}

export function segmentWithZh(text: string) {
  let result: string[] = []
  if (text.length && typeof text === 'string') {
    result = cut(text)
    // NOTE - handle punctuation marks
    result = result.filter(word => !(/[；（）0-9]+/.test(word)))
  }
  return result
}