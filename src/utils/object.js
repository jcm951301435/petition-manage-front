
export function isEmpty (obj) {
  return !isNotEmpty(obj)
}

export function isNotEmpty (obj) {
  for (var i in obj) {
    return true
  }
  return false
}

export function toObj (str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return {}
  }
}
