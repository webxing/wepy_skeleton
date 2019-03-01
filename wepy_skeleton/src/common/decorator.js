function trycatch(cb = 'handleError', wait = true) {
  // console.log('descriptor', target, name, descriptor)
  return function(target, name, descriptor) {
    const fn = descriptor.value
    descriptor.value = async function(...params) {
      console.log(`错误监控 ${name}`)
      try {
        wait ? await fn.call(this, ...params) : fn.call(this, ...params)
      } catch (err) {
        console.log(`错误监控 捕获错误信息: ${err.errMsg} `)
        wait ? await target[cb].call(this, err, name) : target[cb].call(this, err, name)
        console.log(`错误监控 ${name} 错误处理完毕`)
      }
    }
    return descriptor
  }
}
export { trycatch }