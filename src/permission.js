import router from '@/router'
import store from '@/store'

const writeList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 判断有无 token
  if (store.getters.token) {
    // 如果有token，判断是不是去登录页
    if (to.path === '/login') {
      // 如果去登录页，则跳转到首页
      // router.push('/')
      return next('/')
    } else {
      return next()
    }
  } else {
    // 如果没有 token
    if (writeList.indexOf(to.path) !== -1) {
      // 如果找到了，表示在白名单内
      return next()
    } else {
      return next('/login')
      // router.push('/login')
    }
  }
})
