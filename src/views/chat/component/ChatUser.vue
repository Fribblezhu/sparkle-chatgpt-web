<template>
  <div>
    <div class="user-avatar">
      <el-avatar :size="50" :src="userInfo.avatarUrl" class="avatar">
        <img :src="default_avatar_url">
      </el-avatar>
    </div>
    <div class="user-info">
      <div style="line-height: 30px; font-weight: bold; color: black;font-size: 18px">{{ userInfo.username }}</div>
      <div style="line-height: 20px; font-size: 14px">Star On <span style="color:skyblue;" class="hover">Github</span>
      </div>
    </div>
    <div class="user-setting hover">
      <el-icon @click="openSetting">
        <Setting/>
      </el-icon>
    </div>
    <el-dialog
        v-model="settingVisible"
        modal
        :title="$t('setting.title')"
        append-to-body
        v-if="settingVisible"
        width="500px">
      <user-setting ref="user_setting" :user-info="userInfo"></user-setting>
      <template #footer>
        <el-button type="primary" @click="saveUser"> {{ $t('common.save') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue'
import {useStore} from '@/store/store'
import UserSetting from '@/views/chat/component/UserSetting'

export default defineComponent({
  name: 'chat-user',
  components: {UserSetting},
  data() {
    const store = useStore()
    return {
      default_avatar_url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userInfo: computed(() => store.state.user.userInfo),
      settingVisible: false
    }
  },
  methods: {
    openSetting: function () {
      console.log('open user setting')
      this.settingVisible = true
    },
    saveUser: function () {
      const formData = this.$refs.user_setting.getFormData()
      this.$store.commit('user/SET_USER_INFO', formData)
      this.settingVisible = false
    }
  }
})
</script>

<style scoped>
.user-avatar {
  padding: 15px 0 15px 15px;
  float: left;
}

.user-info {
  width: 130px;
  padding: 15px 15px;
  float: left;
  text-align: left;
}

.avatar {
  float: left;
}

.user-setting {
  line-height: 80px;
  font-size: 18px;
}

.hover:hover {
  cursor: pointer;
  color: blue !important;
}

.name {
  line-height: 20px;
}
</style>
