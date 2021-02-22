import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken() // 设置token初始状态  token初始化 => 放入缓存中
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
    login(store, data) {
      return login(data).then((res) => {
        store.commit('setToken', res)
        Message.success('登录成功')
      })
    }
  }
}
