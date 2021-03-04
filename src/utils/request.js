import axios from 'axios'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //  设置axios请求的基础的基础请求地址
  timeout: 5000 // 延时时间
})

// 设置 token 失效时间
const timeOut = 5000

// 请求拦截器
service.interceptors.request.use(
  // 统一实现请求 token 注入
  // 1. 判断有登陆过
  // 2. 是否已经带有 token
  async config => {
    if (!config.headers.Authorization && store.getters.token) {
      if (!isTimeOut()) {
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
      } else {
        // token 过期，执行退出逻辑清理数据
        await store.dispatch('user/logout')
        router.push('/login')
        // 拦截住剩下的请求
        return Promise.reject(new Error('登录已超时'))
      }
    }
    return config
  },
  err => {
    Message.error('请求失败')
    return Promise.reject(new Error(err.message))
  }
)

// 响应拦截器
// 第一个用来处理处理 200 状态码的成功请求(数据不一定对)
// 第二个函数则是处理失败的请求如 404 500
service.interceptors.response.use(
  response => {
  // 解构 response 得到 success / data / message
    const { data, message, success } = response.data
    if (success) {
    // 如果 success 为真，正常返回
      return data
    } else {
    // 否则提示错误
      Message.error(message || '系统错误')
      return Promise.reject(new Error(message)) // 这里 reject 是为了使用的时候继续可以链式调用
    }
  },
  async error => {
    // console.dir(error)
    if (error.response && error.response.data && error.response.data.code === 10002) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('您还未登录'))
    }
    // 提示错误
    Message.error(error.message)
    return Promise.reject(new Error(error))
  })

function isTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > timeOut
}
export default service
