import { setToken, getToken } from '@/utils/auth'
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
    }
  },
  actions: {
    login(store, data) {
      return login(data).then((res) => {
        store.commit('setToken', res)
        Message.success('登录成功')
      })
    },
    async getUserInfo(store) {
      const resSimple = await getUserInfo()
      const resDetail = await getUserDetailById(resSimple.userId)
      const res = {
        ...resSimple,
        ...resDetail
      }
      store.commit('setUserInfo', res)
      // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
      return res
      // console.log(res)
    }
  }
}
