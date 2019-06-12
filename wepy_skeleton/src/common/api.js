// 接口
import http from './http'

// 获取openID
function getOpenId(data) {
  // return http.get('/getopenid', data)

  // 模拟返回数据
  return 'oze5c5FdnX3w3StH2c9KcTb0fuSk'
}

// 登录
function login(data) {
  // return http.get('/login', data)

  // 模拟返回数据
  return {
    token: "9663de0677fb4992ac56817cfe26f9dc"
  }
}


export default {
  getOpenId,
  login
}
