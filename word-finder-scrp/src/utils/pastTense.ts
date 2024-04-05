import axios from 'axios';
import $ from 'jquery'
import CryptoJS from 'crypto-js'

export async function getConjugation(verb: string = 'teach') {
  const BASE_URL = 'http://localhost:3000'
  let result: string[] | undefined
  try {
    const { data } = await axios.get<string[]>(`${BASE_URL}/get`, { params: { verb } })
    result = data
  } catch (error) {
    console.log('error-> ', error);
  } finally {
    return result
  }
}

// from: https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html
function truncate(q: string) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export async function getSoundmark(query: string = 'wanted') {
  const BASE_URL = 'https://openapi.youdao.com/api'
  //TODO - enter appID and appSecret | from: https://ai.youdao.com/console/#/app-overview
  const appKey = ''
  const key = ''
  const salt = (new Date).getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const queryString = appKey + truncate(query) + salt + curtime + key;
  const sign = CryptoJS.SHA256(queryString).toString(CryptoJS.enc.Hex);
  const from = 'auto';
  const to = 'en';
  let result = ''
  // axios don't have the data type of jsonp
  await $.ajax({
    url: BASE_URL,
    type: 'post',
    dataType: 'jsonp',
    data: { q: query, appKey: appKey, salt: salt, from: from, to: to, sign: sign, signType: "v3", curtime: curtime },
    success(data) {
      result = data.basic['us-phonetic']
      console.log(data.basic, result);
    }
  });
  return result
}