import type { Module } from 'vuex'
import type { RootState } from '@/store/store'
import type { Chat, ChatMessage } from '@/typings/chat'

export interface ChatStoreType {
  waiting: boolean
  chatList: Chat[]
  currentIndex?: number
  currentChat?: Chat
}

export interface ChatMessagePayload {
  id: string
  message: ChatMessage
}

export interface SwitchChatPayload {
  before?: number
  current: number
}

const _default: Module<ChatStoreType, RootState> = {
  namespaced: true,
  state: () => ({
    waiting: false,
    chatList: [] as Chat[]
  }),
  mutations: {
    SET_WAITING: (state, payload: boolean) => {
      state.waiting = payload
    },
    SWITCH_CHAT: (state, payload: number) => {
      if (payload > -1 && payload < state.chatList.length) {
        state.currentChat = state.chatList[payload]
        state.currentIndex = payload
      }
    },
    SET_CHAT_LIST: (state, payload) => {
      state.chatList = payload
    },
    ADD_CHAT: (state, payload: Chat) => {
      state.chatList.push(payload)
      state.currentChat = payload
      state.currentIndex = state.chatList.length - 1
    },
    ADD_QUESTION: (state, payload: ChatMessagePayload) => {
      if (state.waiting) {
        throw new Error('chat.busy_error')
      }
      if (state.currentChat == null) {
        throw new Error('chat.empty_chat_error')
      }
      state.waiting = true
      state.currentChat.messages.push(payload.message)
    },
    UPDATE_CHAT_MESSAGE: (state, payload: ChatMessagePayload) => {
      if (state.currentChat == null) return
      for (let i = 0; i < state.currentChat.messages.length; i++) {
        if (state.currentChat.messages[i].id === payload.id) {
          state.currentChat.messages[i] = payload.message
        }
      }
    },
    ADD_CHAT_MESSAGE (state, payload: ChatMessage) {
      if (state.currentChat == null) return
      state.currentChat.messages.push(payload)
    }
  }
}

export default _default
