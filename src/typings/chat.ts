export interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
}

export interface ChatMessage {
  id: string
  conversationId: string
  content: string
  date: string
  role: string
  type: string
  prompt: string
  user?: string
  secret?: string
  finished_reason?: any

}
