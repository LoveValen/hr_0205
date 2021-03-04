import request from '@/utils/request'

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
