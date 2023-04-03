<template>
  <div class="setting-box">
    <el-form :model="userInfo" style="width: 400px">
      <el-form-item :label="$t('user.username')">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.secret')">
        <el-input v-model="form.secret"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.avatar_url')">
        <el-input v-model="form.avatarUrl"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserInfo } from '@/typings/user'

export default defineComponent({
  name: 'user-setting',
  props: {
    userInfo: {
      type: Object as PropType<UserInfo>
    }
  },
  data () {
    return {
      form: this.userInfo
    }
  },
  methods: {
    getFormData: function () {
      return this.form
    }
  }
})
</script>

<style scoped>
.setting-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
