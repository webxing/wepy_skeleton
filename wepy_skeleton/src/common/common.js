// 公用方法
import wepy from 'wepy'

// 根据代码错误信息 返回自定义文字错误信息
function getErrorWarnMsg(msg) {
  if (!msg) return null
  const rules = [
    {code: 1001, msg: 'downloadFile', warnMsg: '网络加载失败(1001)'},
    {code: 1002, msg: 'connect to', warnMsg: '网络加载失败(1002)'},
    {code: 1003, msg: 'timed out', warnMsg: '网络加载失败(1003)'},
    {code: 1004, msg: 'timeout', warnMsg: '网络加载失败(1004)'},
    {code: 1005, msg: '服务器', warnMsg: '网络加载失败(1005)'},
    {code: 1006, msg: '互联网', warnMsg: '网络加载失败(1006)'},
    {code: 1007, msg: 'saveFile', warnMsg: '网络加载失败(1007)'},
    {code: 1008, msg: 'request', warnMsg: '网络加载失败(1008)'},
    {code: 1009, msg: 'getImageInfo', warnMsg: '网络加载失败(1008)'}
  ]
  const item = rules.find((item) => msg.includes(item.msg))
  if (item) {
    return item.warnMsg
  } else {
    return null
  }
}


// 微信modal框
function showModal(content, title = '提示', showCancel = true) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      success: (res) => {
        res.confirm ? resolve(1) : resolve(0)
      }
    })
  })
}

// 分享文案
function shareTxt(type) {
  let path = type ? `/pages/index?from=${type}` : `/pages/index`
  console.log('分享链接：', path)
  return {
    title: '我邀请你和我一起参与内测和领取更多福利～',
    imageUrl: '../images/share@2x.png',
    path
  }
}

export default {
  getErrorWarnMsg,
  showModal,
  shareTxt
}