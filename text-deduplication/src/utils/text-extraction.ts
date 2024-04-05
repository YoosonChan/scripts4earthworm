interface Data {
  chinese: string
  english: string
  soundmark: string
}

export function extractWithEn(data: Data[]) {
  return data.map(d => d.english)
}

export function extractWithZh(data: Data[]) {
  return data.map(d => d.chinese)
}
