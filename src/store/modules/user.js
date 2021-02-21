import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, data) {
      // 将传入的 token 放到 vuex state 中(方便使用，但不能持久化)
      state.token = data
      // 引入 utils 中的小工具，用来将token存入到cookie中
      setToken(data)
    }
  },
  actions: {
    async login(store, data) {
      const res = await login(data)
      const { message, success, data: token } = res.data
      if (success) {
        Message.success({ message })
        store.commit('setToken', token)
      }
    }
  }
}
