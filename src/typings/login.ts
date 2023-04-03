import { type UserInfo } from '@/typings/user'

export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  user: UserInfo
}
