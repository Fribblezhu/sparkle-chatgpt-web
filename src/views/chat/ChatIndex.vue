<template>
  <el-container class="chat-container">
    <el-aside class="chat-aside">
      <chat-list class="chat-list" :chat-list="chatList" :current-index="currentIndex" :waiting="waiting"></chat-list>
      <chat-user class="chat-setting"></chat-user>
    </el-aside>
    <el-main class="chat-main">
      <message-container :chat="currentChat" :user-info="userInfo" :waiting="waiting"></message-container>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/store'
import ChatList from '@/views/chat/component/ChatList.vue'
import ChatUser from '@/views/chat/component/ChatUser.vue'
import MessageContainer from '@/views/chat/component/MessageContainer.vue'
import { getUserInfo, getChatList } from '@/lib/localstorage_util'

export default defineComponent({
  name: 'app-chat-index',
  components: {MessageContainer, ChatUser, ChatList},
  data () {
    const store = useStore()
    return {
      chatList: computed(() => store.state.chat.chatList),
      currentChat: computed(() => store.state.chat.currentChat),
      currentIndex: computed(() => store.state.chat.currentIndex),
      userInfo: computed(() => store.state.user.userInfo),
      waiting: computed(() => store.state.chat.waiting),
      settingVisible: false
    }
  },
  created () {
    this.loadUserInfo()
    this.loadChatList(true)
  },
  methods: {
    loadUserInfo: function () {
      const userInfo = getUserInfo()
      if (userInfo) {
        this.$store.commit('user/SET_USER_INFO', userInfo)
      }
    },
    loadChatList: function (local: boolean) {
      if (local) {
        const chatList = getChatList()
        this.$store.commit('chat/SET_CHAT_LIST', chatList)
      }
    }
  }
})
</script>

<style scoped>
.chat-container {
  height: 100%;
  width: 100%;
  padding-bottom: 0;
}

.chat-aside {
  border: 1px solid #d3d3d3;
}

.chat-list {
  height: calc(100% - 81px);
}

.chat-setting {
  height: 80px;
  border-top: 1px solid #d3d3d3;
}

.chat-main {
  border: 1px solid #d3d3d3;
}
</style>
