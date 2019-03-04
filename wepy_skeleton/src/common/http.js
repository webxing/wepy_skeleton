import wepy from 'wepy'
const sessionType = {
  'json': {'content-type': 'application/json'},
  'form': {'content-type': 'application/x-www-form-urlencoded'}
}

function HttpRequest(url, params = {}, method = 'GET',sessionChoose = 'form') {
  return new Promise((resolve, reject) => {
    url = wepy.$appConfig.rootURL + '/sentence' + url
    const session = sessionType[sessionChoose]
    const {token} = wx.getStorageSync('user') || ''
    if (token) {
      params = Object.assign(params, {token})
    }
    wepy.request({
      url: url,
      method: method,
      header: session,
      data: params,
      dataType: 'json',
    }).then(res => {
      if (res.statusCode === 200 && res.data.code === 1) {
        // 请求成功 后台code为1 正常
        resolve(res.data.data)
      } else {
        // 请求成功 后台code不为1 异常
        console.log('code不是1-', res)
        reject(res.data)
      }
    }).catch(error => {
      // 请求失败
      console.log('error-', error)
      reject(error)
    })
  })
}
function get(url, params) {
  return HttpRequest(url, params)
}
function post(url, params, type) {
  return HttpRequest(url, params, 'POST', type)
}
module.exports = {
  get,
  post
}
