<template>
  <el-card class="chat-card">
    <template #header>
      <div class="chat-list-header">
        <span>{{ $t('chat.chat_list') }}</span>
        <el-icon class="add-icon" :title="$t('chat.add_chat')" @click="addChat">
          <Edit/>
        </el-icon>
      </div>
    </template>
    <template #default>
      <div class="chat-list-body">
        <template :key="chat.id" v-for="(chat, index) in chatList">
          <div class="chat-list-item-wrapper">
            <div :class="currentIndex === index ? activeClass : normalClass" @click="onChatSelected(index)">
              <div style="width: 30px;">
                <el-button type="info" size="small" icon="ChatDotRound" circle/>
              </div>
              <div class="chat-title" v-if="editId !== chat.id">
                {{ chat.title }}
              </div>
              <div style="width: 162px;" v-else>
                <el-input v-model="chat.title" style="height: 30px"/>
              </div>
              <div style="width: 30px" v-show="editId !== chat.id">
                <el-button type="success" size="small" icon="EditPen" @click="editChatTitle(chat.id)" circle/>
              </div>
              <div style="width: 30px" v-show="editId !== chat.id">
                <el-button type="danger" size="small" icon="Delete" circle/>
              </div>
              <div style="width: 30px" v-show="editId === chat.id">
                <el-button type="success" size="small" icon="CircleCheckFilled" @click="saveChatTitle" circle/>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Chat } from '@/typings/chat'
import { uuid } from '@/lib/utils'

export default defineComponent({
  name: 'ChatList',
  props: {
    chatList: {
      type: Object as PropType<Chat[]>,
      required: true
    },
    currentIndex: {
      type: Number
    },
    waiting: {
      type: Boolean
    }
  },
  data () {
    return {
      editId: '',
      normalClass: ['chat-list-item', 'chat-list-item-normal', 'hover'],
      activeClass: ['chat-list-item', 'chat-list-item-active', 'hover']
    }
  },
  methods: {
    addChat () {
      if (this.waiting) {
        this.$message.warning(this.$t('chat.stop_answer_first'))
        return
      }
      const uid = uuid(4)
      const chat = {
        title: '对话_' + uid,
        id: 'num' + Date.now() + uid,
        messages: []
      }
      this.$store.commit('chat/ADD_CHAT', chat)
    },
    editChatTitle (id: string, event: MouseEvent) {
      // eslint-disable-next-line
      debugger
      this.editId = id
      event.preventDefault()
    },
    saveChatTitle (event: MouseEvent) {
      this.editId = ''
      event.preventDefault()
    },
    onChatSelected (index: number) {
      if (this.waiting) {
        this.$message.warning(this.$t('chat.stop_answer_first'))
        return
      }
      this.$store.commit('chat/SWITCH_CHAT', index)
    }
  }
})
</script>

<style scoped>
.chat-card {
  height: 100%;
  border: none
}

.chat-list-header {
  text-align: left;
}

.add-icon {
  float: right;
  font-size: 20px
}

.add-icon:hover {
  color: blue;
  cursor: pointer;
}

.chat-list-body {

}

.chat-list-item-wrapper {
  padding: 10px;
}

.chat-list-item {
  border-radius: 5px;
  line-height: 50px;
}

.chat-list-item-normal {
  border: 1px solid #d3d3d3;
}

.chat-list-item-active {
  border: 1px solid green;
  background-color: rgba(245, 245, 245, 1)
}

.chat-list-item div {
  display: inline-block;
}

.hover:hover {
  cursor: pointer;
}

.chat-title {
  width: 140px;
  text-align: left;
}
</style>
