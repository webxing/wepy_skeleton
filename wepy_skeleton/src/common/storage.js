import wepy from 'wepy'

function set(key, value) {
  return new Promise((resolve, reject) => {
    wepy.setStorage({key: key, data: value}).then(res => {
      console.log(`【缓存】存储${key}成功`)
      resolve()
    }).catch(res => {
      console.log(`【缓存】存储${key}失败`)
      resolve()
    })

  })
}
function get(key) {
  return new Promise((resolve, reject) => {
    wepy.getStorage({key: key}).then(res => {
      resolve(res.data)
    }).catch(res => {
      // console.log(`【缓存】缓存不存在${key}`)
      resolve()
    })
  })
}

function remove(key) {
  return new Promise((resolve, reject) => {
    wepy.removeStorage({key: key}).then(res => {
      console.log(`【缓存】清除缓存${key}成功`)
      resolve()
    }).catch(res => {
      console.log(`【缓存】清除缓存${key}失败`)
      resolve()
    })
  })
}

function clear() {
  return new Promise((resolve, reject) => {
    wepy.clearStorage().then(res => {
      console.log(`【缓存】清空缓存成功`)
      resolve()
    }).catch(res => {
      console.log(`【缓存】清空缓存失败`)
      resolve()
    })
  })
}

// set('test', 'liuxin')
// get('test')
// remove('test')
// clear()

export default {
  set,
  get,
  remove,
  clear
}