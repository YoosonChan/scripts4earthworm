<script setup lang="ts">
import { ref } from 'vue'
import { getConjugation, getSoundmark } from './utils/pastTense';
import list from './assets/data.json'
interface WordList {
  chinese: string
  english: string
  soundmark: string
}
type Word = [string, string, string | undefined]
/**
 * Conjugation
 */
// TODO - for unit test
// wordList.value = [
//   ['teach', 'teaches', undefined],
//   ['want', 'wants', undefined]
// ]
const conjugation = ref('')
const isCompleted = ref(false)
const getWordList = async () => {
  if (wordList.value.some(item => !item[2])) {
    for (const ws of wordList.value) {
      if (!ws[2]) {
        await new Promise((resolve) => {
          setTimeout(() => {
            console.log('wait');
            resolve(true)
          }, 2000)
        })
        console.log('request', ws[0]);
        const data = await getConjugation(ws[0])
        if (data?.length) {
          console.log('get preterite', data[1]);
          ws[2] = data[1];
          conjugation.value = ws.join('-');
        } else {
          console.log('fail');
        }
      }
    }
  } else {
    isCompleted.value = true
  }
  localStorage.setItem('wordlist', JSON.stringify(wordList.value))
}
const handleGetConjugationClick = () => {
  getWordList()
}
/**
 * Soundmark List
 */
const wordList = ref<Word[]>([]);
(list as WordList[]).forEach(item => {
  const word = item.english.split(' ').map(w => w.trim())
  wordList.value.push([word[0], word[1], undefined])
})
const soundmarkList = ref<WordList[]>([])
const getSoundmarkList = async () => {
  const _list: Word[] = JSON.parse(localStorage.getItem('wordlist') as string)
  // TODO - for unit test
  // const _list: Word[] = [["be", "is", "was"], ["be(is)", "is", "was"], ["be(are)", "is", "were"]]
  const _soundmarkList: string[][] = []
  const _wordList: WordList[] = []
  let soundmark = ''
  let index = 0
  for (const item of _list) {
    const { chinese, soundmark: _soundmark } = list[index]
    const english = item.join(' ')
    const soundmarks = []
    for (const word of item) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log('wait');
          resolve(true)
        }, 4000)
      })
      console.log('get soundmark -> ', word);
      soundmarks.push(`/${await getSoundmark(word)}/`)
    }
    if (soundmarks.length === 3) {
      soundmark = soundmarks.join(' ')
    }
    _soundmarkList.push(soundmarks)
    _wordList.push({ chinese, english, soundmark })
    index++
  }
  console.log(_wordList, _soundmarkList);
  soundmarkList.value = _wordList
  localStorage.setItem('soundmarkList', JSON.stringify(_wordList))
  localStorage.setItem('_soundmarkList', JSON.stringify(_soundmarkList))
}
const handleGetSoundmarkListClick = () => {
  getSoundmarkList()
}
/**
 * Soundmark
 */
const word = ref('')
const soundmark = ref('')
const handleGetSoundmark = async () => {
  if (word.value.length) {
    soundmark.value = `/${await getSoundmark(word.value)}/`
  }
}
</script>

<template>
  <a-space class="mt-8">
    <a-input v-model="word"></a-input>
    <a-button @click="handleGetSoundmark">GET SOUNDMARK</a-button>
  </a-space>
  <div>{{ soundmark }}</div>
  <a-divider />
  <a-space class="mt-2">
    <a-button disabled @click="handleGetConjugationClick">GET CONJUGATION</a-button>
    <a-button disabled @click="handleGetSoundmarkListClick">GET SOUNDMARK LIST</a-button>
  </a-space>
  <div v-if="conjugation?.length">Preterite: {{ conjugation }}</div>
  <div v-for="item in soundmarkList"> {{ item.soundmark }}</div>
</template>
