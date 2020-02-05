
const defaultFormat = 'yyyy-MM-dd hh:mm:ss'

export function formatDate (date, fmt) {
  fmt = fmt || defaultFormat
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function dateAddDays (date, days) {
  var dateAfter = new Date()
  dateAfter.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  return dateAfter
}

export function now () {
  return new Date()
}

export function today () {
  var date = now()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export default {
  formatDate,
  dateAddDays,
  now,
  today
}
