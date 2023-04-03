import type { UserInfo } from '@/typings/user'

const USER_INFO_KEY = 'user_info'
const CHAT_LIST_KEY = 'chat_list'

export const getUserInfo = function () {
  const json = localStorage.getItem(USER_INFO_KEY)
  if (json == null) return undefined
  return JSON.parse(json)
}

export const setUserInfo = function (userInfo: UserInfo) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

export const removeUserInfo = function () {
  localStorage.removeItem(USER_INFO_KEY)
}

export const getChatList = function () {
  const json = localStorage.getItem(CHAT_LIST_KEY)
  if (json == null) return []
  return JSON.parse(json)
}
