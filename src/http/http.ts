import axios, {AxiosInstance} from "axios";

const _default: AxiosInstance = axios.create({

})

_default.interceptors.request.use(
     (config) =>{
                return config
    },
     (error) => {
        return Promise.reject(error)
    })

_default.interceptors.response.use(
     (response) => {
        return response
    },
     (error) =>{
        return Promise.reject(error)
    }
)

export default _default
