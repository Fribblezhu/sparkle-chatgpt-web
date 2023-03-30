import http from './http'
import {LoginForm, LoginResponse} from "@/typings/login";
import {AxiosResponse} from "axios";

const Api = {
   login: (form: LoginForm) => {
       return http.get<any, AxiosResponse<LoginResponse>, LoginForm>(
           '/login/pwd',
           {
               data: form
           }
       )
   }
}

export default Api
