// 接口
import http from './http'

// 获取openID
function getOpenId(data) {
  return http.get('/getopenid', data)
}


export default {
  getOpenId
}
