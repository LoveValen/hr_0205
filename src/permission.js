import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const writeList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断有无 token
  if (store.getters.token) {
    // 如果有token，判断是不是去登录页
    if (to.path === '/login') {
      // 如果去登录页，则跳转到首页
      // router.push('/')
      next('/')
    } else {
      if (!store.getters.name) {
        store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 如果没有 token
    if (writeList.indexOf(to.path) !== -1) {
      // 如果找到了，表示在白名单内
      next()
    } else {
      next('/login')
      // router.push('/login')
    }
  }
  // 修复手动页面切换地址或页面刷新时无法停止进度条的问题
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

router.afterEach(route => {
  NProgress.done()
})
