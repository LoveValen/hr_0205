import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

/** *
 *
 * 获取用户的基本信息
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/** *
 *
 * 通过 id 获取用户的详细信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
