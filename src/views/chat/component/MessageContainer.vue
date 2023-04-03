<template>
  <div style="height: 100%; text-align: center">
    <div class="center-box message-box">
      <div class="inner-box">
        <div v-if="chat" style="height: 100%;">
          <div class="message-title">
            {{ chat.title }}
          </div>
          <template v-if="chat.messages.length > 0">
            <div class="message-content" id="message-content">
              <template :key="message.id" v-for="message in chat.messages">
                <template v-if="message.role === 'user'">
                  <div class="message-item">
                    <div style="display: inline-block; height: 60px">
                      <el-image :src="userInfo.avatarUrl" style="width: 60px" @dblclick="manualStopAnswer()"></el-image>
                    </div>
                    <div style="display: inline-block; margin-left: 10px">
                      <div style="line-height: 20px; text-align: left">
                        {{ message.date }}
                      </div>
                      <div class="message-text">
                        <markdown-text :text="message.content" :message-id="message.id"></markdown-text>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="message-item message-item-reverse">
                    <div style="display: inline-block; height: 60px">
                      <el-image :src="default_avatar_url" style="width: 60px"></el-image>
                    </div>
                    <div style="display: inline-block; margin-right: 10px">
                      <div style="line-height: 20px; text-align: right">
                        {{ message.date }}
                      </div>
                      <div class="message-text">
                        <markdown-text :text="message.content" :message-id="message.id"></markdown-text>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </template>
          <template v-else>
            <el-empty style="height: calc(100% - 20px) " :description="$t('chat.message_empty_tip')"/>
          </template>
        </div>
        <div v-else style="height: 100%">
          <el-empty style="height: 100%" :description="$t('chat.chat_empty_tip')"/>
        </div>
      </div>
    </div>
    <div class="center-box operation-box">
      <div class="inner-box">
        <div style="line-height: 60px">
          <div class="operation-icons">
            <el-button type="danger" icon="Delete" circle/>
            <el-button type="primary" icon="Download" circle/>
            <el-button :type="timerType" icon="Timer" circle @click="timerClick"/>
          </div>
          <div class="operation-input">
            <el-input v-model="question" style="height: 40px"></el-input>
          </div>
          <div>
            <el-button type="success" icon="Position" :disabled="waiting" circle @click="addQuestion"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Chat, ChatMessage } from '@/typings/chat'
import { uuid } from '@/lib/utils'
import { UserInfo } from '@/typings/user'
import { ChatGPT } from '@/lib/chat_gpt'
import MarkdownText from '@/views/chat/component/MarkdownText.vue'

export default defineComponent({
  name: 'message-container',
  components: {MarkdownText},
  props: {
    chat: {
      type: Object as PropType<Chat>
    },
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: true
    },
    waiting: {
      type: Boolean
    }
  },
  data () {
    return {
      default_avatar_url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      timerType: 'success',
      question: '请使用java写一个快速排序。',
      normalClass: ['message-item'],
      reverseClass: ['message-item', 'message-item-reverse'],
      chatGPT: undefined as unknown as ChatGPT,
      lastQuestion: undefined as unknown as ChatMessage,
      lastAnswer: undefined as unknown as ChatMessage,
      askOnConnected: false,
      manualStopLoading: false
    }
  },
  created () {
    this.connectChatGPT()
  },
  methods: {
    timerClick: function () {
      if (this.timerType === 'success') {
        this.timerType = 'info'
      } else {
        this.timerType = 'success'
      }
      console.log(this.timerType)
    },
    addQuestion: function () {
      if (this.waiting) {
        this.$message.warning(this.$t('chat.busy_error'))
      }
      const formatQuestion = this.question.trim()
      if (formatQuestion.length === 0) {
        return
      }
      const message = {
        id: uuid(16),
        conversationId: uuid(16),
        content: formatQuestion,
        prompt: formatQuestion,
        type: 'ask',
        role: 'user',
        date: new Date().toLocaleString(),
        user: this.userInfo.username,
        secret: this.userInfo.secret
      } as ChatMessage

      try {
        this.$store.commit('chat/ADD_QUESTION', {message})
      } catch (e: Error | any) {
        this.$message.error(this.$t(e.message))
        return
      }

      const answer = {
        id: uuid(16),
        conversationId: message.conversationId,
        content: '',
        prompt: formatQuestion,
        type: 'answer',
        role: 'assistant',
        date: new Date().toLocaleString(),
        user: this.userInfo.username,
        secret: this.userInfo.secret
      } as ChatMessage

      try {
        this.$store.commit('chat/ADD_CHAT_MESSAGE', answer)
      } catch (e: Error | any) {
        this.$message.error(this.$t(e.message))
        return
      }

      this.lastAnswer = answer
      this.askChatGPT(answer)
      this.question = ''

      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom: function () {
      const ele = document.getElementById('message_box')
      if (ele) {
        ele.scrollTop = ele.scrollHeight
      }
    },
    connectChatGPT: function () {
      if (!this.userInfo.secret || !this.userInfo.username) {
        this.$message.warning(this.$t('chat.please_set_secret_first'))
        return
      }
      if (this.chatGPT && this.chatGPT.connected) {
        return
      }
      const url = 'ws://' + window.location.host + '/websocket-chat/' + this.userInfo.username
      this.chatGPT = new ChatGPT(url, this.onmessage, this.onconnect, this.onclose)
      this.chatGPT.start()
    },
    askChatGPT (message: ChatMessage) {
      if (!this.chatGPT || !this.chatGPT.connected) {
        this.connectChatGPT()
        this.askOnConnected = true
        return
      }
      this.lastQuestion = message
      this.chatGPT.sendQuestion(message)
    },
    onmessage: function (json: string) {
      const message = JSON.parse(json) as ChatMessage

      // 过滤掉非本次掉回答
      if (this.lastAnswer.conversationId !== message.conversationId) return
      if (message.type === 'error') {
        this.lastAnswer.content = this.$t(message.content)
      } else {
        if (message.content) {
          this.lastAnswer.content = this.lastAnswer.content + message.content
        }
      }
      this.$store.commit('chat/UPDATE_CHAT_MESSAGE', {id: this.lastAnswer.id, message: this.lastAnswer})

      if (message.finished_reason) {
        this.stopAnswer()
      }
    },
    onconnect: function () {
      if (this.askOnConnected && this.lastQuestion) {
        this.askChatGPT(this.lastQuestion)
      }
    },
    onclose: function () {
      console.log('websocket on close')
    },
    manualStopAnswer: function () {
      if (this.manualStopLoading) return
      this.manualStopLoading = true
      try {
        this.lastAnswer.content = this.lastAnswer.content + '[手动终止回答]'
        this.lastAnswer.finished_reason = 'manual'
        this.$store.commit('chat/UPDATE_CHAT_MESSAGE', {id: this.lastAnswer.id, message: this.lastAnswer})
        this.stopAnswer()
      } finally {
        this.manualStopLoading = false
      }
    },
    stopAnswer: function () {
      this.$store.commit('chat/SET_WAITING', false)
      this.lastAnswer = undefined as unknown as ChatMessage
      this.lastQuestion = undefined as unknown as ChatMessage
    }
  },
  unmounted () {
    if (!this.chatGPT) return
    if (this.chatGPT.connected) {
      this.chatGPT.close()
    }
  }
})
</script>

<style scoped>
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.message-box {
  height: calc(100% - 60px);
}

.operation-box {
  height: 60px;
}

.inner-box {
  max-width: 1200px;
  width: 50%;
  height: 100%;
  min-width: 800px;
}

.operation-icons {
  font-size: 20px;
  float: left;
  width: 150px;
}

.operation-icons i {
  margin-right: 20px;
}

.operation-input {
  float: left;
  width: calc(100% - 150px - 50px);
}

.message-item {
  display: flex;
  margin: 10px 0;
}

.message-item-reverse {
  flex-direction: row-reverse;
}

.message-title {
  height: 40px;
  line-height: 40px;
  border: 1px solid green;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
}

.message-content {
  height: calc(100% - 80px);
  margin: 10px 0;
  line-height: 30px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  color: black;
  overflow: auto;
}

.message-text {
  margin-top: 10px;
  line-height: 30px;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  padding: 10px;
  color: black;
}

.hover {
  cursor: pointer;
}

.send-icon {
  font-size: 40px;
  line-height: 60px;
  margin: 10px 0;
}

.active {
  color: blue;
}

/*-------滚动条整体样式----*/
.message-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/*滚动条里面小方块样式*/
.message-content::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px white;;
}

/*滚动条里面轨道样式*/
.message-content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px white;
  border-radius: 0;
  background: white;
}

/*滚动条里面小方块样式*/
.message-content:hover::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: lightblue;
}

/*滚动条里面轨道样式*/
.message-content:hover::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.message-content:hover::-webkit-scrollbar {
  width: 8px;
  height: 8px;

}

</style>
