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

function drawTxt({context, scale = 0.5, text = 'test text', fillStyle = '#000', broken = true, ...rest}) {
  if (!context) throw Error('请传入绘制上下文环境context')
  // 默认设置
  let origin = {x: 0, y: 0, lineHeight: 30, maxWidth: 630, fontSize: 28}

  // 比例计算正确的尺寸
  for (let item in rest) {
    rest[item] *= scale
  }

  // 获取计算后的值
  let {x, y, lineHeight, maxWidth, fontSize} = {...origin, ...rest}

  // 设置字体样式
  context.setTextAlign('left')
  context.setTextBaseline('top')
  context.setFillStyle(fillStyle)
  context.setFontSize(fontSize)

  // broken: true  如果不考虑英文单词的完整性 适用于所有情况
  // broken: false  考虑英文单词的完整性 仅适用于纯英文
  // 【TODO: 中英混排且考虑单词截断...】

  let splitChar = broken ? '' : ' '

  let arrText = text.split(splitChar)
  let line = ''
  let linesCount = 0

  for (var n = 0; n < arrText.length; n++) {
    let testLine = line + arrText[n] + splitChar
    let testWidth = context.measureText(testLine).width
    if (testWidth > maxWidth && n > 0) {
      // 一行已经绘制完成
      linesCount++
      context.fillText(line, x, y)
      line = arrText[n] + splitChar
      y += lineHeight
    } else {
      // 一行还未绘制完成
      line = testLine
    }
  }

  linesCount++
  context.fillText(line, x, y)
  return linesCount * lineHeight
}

// 【drawTxt example】
// let allHeight = drawTxt({
//   context,
//   scale,
//   text: 'Free Classifieds Using Them To Promote Your Stuff Online',
//   broken: false,
//   fillStyle: '#ccc',
//   x: 0,
//   y: 0,
//   lineHeight: 66,
//   maxWidth: 630,
//   fontsize: 48
// })
// console.log(`此次绘制总高度：${allHeight}px`)

export default {
  getErrorWarnMsg,
  showModal,
  shareTxt,
  drawTxt
}
