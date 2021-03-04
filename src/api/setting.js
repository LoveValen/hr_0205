import request from '@/utils/request'

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

/**
 * 获取角色列表
 * **/
export function getRoleList(params) {
  return request({
    url: `/sys/role`,
    params
  })
}
