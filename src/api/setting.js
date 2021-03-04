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

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/** *
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
/** *
 * 添加角色
 * ***/
export function addRole(data) {
  return request({
    url: `/sys/role`,
    method: 'post',
    data
  })
}

