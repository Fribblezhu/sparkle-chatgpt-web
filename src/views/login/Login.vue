<template>
  <div class="login-container">
    <div class="login-container-wrapper">
      <div class="owl-head"></div>
      <div v-show="!closeEyes">
        <div class="owl-fist owl-fist-let"></div>
        <div class="owl-fist owl-fist-right"></div>
      </div>
      <div v-show="closeEyes">
        <div class="owl-arm owl-arm-right"></div>
        <div class="owl-arm owl-arm-left"></div>
      </div>
      <div class="fit-box fit-box-left"></div>
      <div class="fit-box fit-box-right"></div>
      <div class="login-form-wrapper">
        <el-form :model="loginForm" label-width="60px" label-suffix=":" style="color:white;" ref="loginForm" status-icon
                 :rules="rules">
          <el-form-item :label="$t('login.username')" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item :label="$t('login.password')" prop="password">
            <el-input v-model="loginForm.password" @focus="closeEyesFunc(true)" @blur="closeEyesFunc(false)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="doLogin">{{ $t('login.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { LoginForm } from '@/typings/login'
import { FormRules } from 'element-plus'

export default defineComponent({
  name: 'app-login',
  data () {
    const rules = reactive<FormRules>({
      username: [
        {required: true, message: this.$t('login.error.empty_username'), trigger: 'blur'}
      ],
      password: [
        {required: true, message: this.$t('login.error.empty_password'), trigger: 'blur'}
      ]
    })
    return {
      loginForm: {
        username: '',
        password: ''
      } as LoginForm,
      rules,
      closeEyes: false
    }
  },
  methods: {
    doLogin: function () {
      this.$Api.login(this.loginForm).then(res => {
        console.log(res)
      })
    },
    closeEyesFunc: function (flag: boolean) {
      this.closeEyes = flag
    }
  }

})
</script>

<style scoped>
.login-container {
  width: 400px;
  height: 300px;
  position: absolute;
  top: calc(25% - 150px);
  right: calc(25% - 200px);
}

.login-container-wrapper {
  position: relative;
}

.owl-head {
  height: 100px;
  width: 396px;
  background: url("/src/assets/images/login/owl-login.png") no-repeat center;
  position: absolute;
  z-index: 15;
}

.owl-fist {
  height: 34px;
  width: 34px;
  border-radius: 34px;
  position: absolute;
  background-color: #472d20;
  transform: rotateX(45deg);
  top: 80px;
}

.owl-fist-let {
  left: 100px;
}

.owl-fist-right {
  right: 100px;
}

.owl-arm {
  background: url("/src/assets/images/login/owl-login-arm.png") no-repeat center;
  top: 52px;
  width: 340px;
  height: 65px;
  position: absolute;
  z-index: 20;
}

.owl-arm-right {
  right: 57px;
}

.owl-arm-left {
  left: 62px;
  transform: rotate(180deg) rotateX(180deg);
}

.fit-box {
  width: 200px;
  height: 5px;
  top: 95px;
  position: absolute;
  z-index: 30;
}

.fit-box-left {
  left: 0;
  background: linear-gradient(-145deg, transparent 5px, rgb(120, 120, 120) 0);
}

.fit-box-right {
  right: 0;
  background: linear-gradient(145deg, transparent 5px, rgb(120, 120, 120) 0);
}

.login-form-wrapper {
  background-color: rgba(120, 120, 120, 1);
  border-radius: 0 0 10px 10px;
  padding: 28px 34px;
  position: absolute;
  top: 100px;
  width: 332px;
  z-index: 30;
}

.login-form .el-form-item__label {
  color: white;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
