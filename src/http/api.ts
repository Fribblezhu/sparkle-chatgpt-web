import http from './http'
import type { LoginForm, LoginResponse } from '@/typings/login'
import { type AxiosResponse } from 'axios'

const Api = {
  login: async (form: LoginForm) => {
    return await http.get<any, AxiosResponse<LoginResponse>, LoginForm>(
      '/login/pwd',
      {
        data: form
      }
    )
  }
}

export default Api
