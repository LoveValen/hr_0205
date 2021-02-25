import Cookies from 'js-cookie'

const TokenKey = 'hr-ihrm-token'
const TimeKey = 'hr-ihrm-timestamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTimeStamp() {
  Cookies.set(TimeKey, Date.now())
}

export function getTimeStamp() {
  return Cookies.get(TimeKey)
}

