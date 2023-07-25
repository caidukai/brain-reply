import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { customAlphabet } from 'nanoid'
import { marked } from 'marked'
import highlight from 'highlight.js'
marked.setOptions({
  highlight: function (code, lang, callback) {
    return highlight.highlight(code, { language: lang }).value;
    // require('pygmentize-bundled') ({ lang: lang, format: 'html' }, code, function (err, result) {
    //   callback(err, result.toString());
    // });
  }
})
dayjs.extend(utc)
export const generateUUID = () => {
  const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16)()
  return id
}
export const generateLongUUID = () => {
  const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 30)()
  return id
}
export const generateShortUUID = () => {
  const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6)()
  return id
}
export const generateMiddleUUID = () => {
  const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12)()
  return id
}

export const getUTC = () => {
  return dayjs.utc().format()
}
export const getLS = (key: string) => {
  let val = localStorage.getItem(`br-${key}`) || ''
  let i = val ? JSON.parse(val as any) : null
  return i
}
export const setLS = (key: string, val: any) => {
  return localStorage.setItem(`br-${key}`, JSON.stringify(val))
}

export const getLSUseSize = () => {
  const isServerSide = typeof window === 'undefined'
  if (isServerSide) {
    return 0
  }
  var x, xLen, log = [], total = 0;
  for (x in localStorage) {
    if (!localStorage.hasOwnProperty(x)) { continue; }
    xLen = ((localStorage[x].length * 2 + x.length * 2) / 1024);
    // log.push(x.substr(0, 30) + " = " + xLen.toFixed(2) + " KB");
    total += xLen
  };
  return {
    txt: total > 1024 ? (total / 1024).toFixed(2) + " MB" : total.toFixed(2) + " KB",
    num: 1024
  }
  // if (total > 1024) {
  //   log.unshift("Total = " + (total / 1024).toFixed(2) + " MB");
  // } else {
  //   log.unshift("Total = " + total.toFixed(2) + " KB");
  // };
  // console.log(log.join("\n"))
}

export const getRenderString = (str: string) => {
  const isServerSide = typeof window === 'undefined'
  if (isServerSide) {
    return ''
  }
  return marked(str)
}