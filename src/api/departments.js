import request from '@/utils/request'

/** *
 *
 * 获取组织架构数据
 * **/
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/** *
 *
 * 根据 id 删除部门
 * **/
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/** *
 *
 * 新增部门接口
 * **/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/** *
 *
 * 新增部门接口
 * **/
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/** *
 *
 * 新增部门接口
 * **/
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
