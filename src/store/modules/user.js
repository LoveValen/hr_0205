import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken(), // 设置token初始状态  token初始化 => 放入缓存中
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      // 将传入的 token 放到 vuex state 中(方便使用，但不能持久化)
      state.token = data
      // 引入 utils 中的小工具，用来将token存入到cookie中
      setToken(data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    removeToken(state) {
      // 删除 vuex 中的token
      state.token = ''
      // 删除缓存中的 token
      removeToken()
    },
    removeUserInfo(state) {
      // 删除用户信息
      state.userInfo = {}
    }
  },
  actions: {
    async login(store, data) {
      const res = await login(data)
      store.commit('setToken', res)
      Message.success('登录成功')
      // 设置时间戳
      setTimeStamp()
    },
    async getUserInfo(store) {
      const resSimple = await getUserInfo()
      const resDetail = await getUserDetailById(resSimple.userId)
      const res = {
        ...resSimple,
        ...resDetail
      }
      console.log(res)
      store.commit('setUserInfo', res)
      // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
      return res
      // console.log(res)
    },
    logout(store) {
      store.commit('removeToken')
      store.commit('removeUserInfo')
    }
  }
}
