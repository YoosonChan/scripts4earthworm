const Koa = require('koa')
const cors = require('@koa/cors')
const axios = require('axios')
const cheerio = require('cheerio')
// const request = require('request')
const app = new Koa()
app.use(cors())

const getContentFromWordhippo = async () => {
  const BASE_URL = 'https://www.wordhippo.com/what-is/the-past-tense-of/'
  const verb = 'want'
  const url = `${BASE_URL}${verb}.html`
  let text = ''
  await axios(url).then(res => {
    const { data } = res
    const $ = cheerio.load(data)
    text = $('.relatedwords').text()
  })
  return text
}

const getContentFromConj = async (verb) => {
  const BASE_URL = 'https://www.theconjugator.com/php5/index.php?l=en&v='
  const url = `${BASE_URL}${verb}`
  let text = ''
  await axios(url).then(res => {
    const { data } = res
    const $ = cheerio.load(data)
    text = $('div.verbe>p').text()
    text = text.split(':')[1].trim().split('-').map(item => item.trim())
    console.log('-----success-----');
    console.log(text);
    console.log('-----success-----');
  }).catch(error => {
    console.log('-----error-----');
    console.log(error);
    console.log('-----error-----');
  })
  return text
}

app.use(async ctx => {
  if (ctx.request.path === '/get') {
    const { verb } = ctx.request.query
    if (verb && verb.length) {
      try {
        const data = await getContentFromConj(verb)
        ctx.body = data
      } catch (error) {
        ctx.error = 'error'
      }
    }
  }
})
app.listen(3000)
console.log('listening...');