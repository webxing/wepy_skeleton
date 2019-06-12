/**
 *
 * 通过 bindEvent 绑定 topic maxCount fn 到toDoList上
 * { topic } 主题
 * { maxCount } 成员上限
 * { fn } 满足成员上限需要触发的函数
 *
 */
let toDoList = new Map()

// 清空该topic的所有信息
function removeEvent(topic) {
  if (!topic || !toDoList.has(topic)) return
  toDoList.delete(topic)
}

// 清空所有topic
function removeAllEvent() {
  toDoList.clear()
}

// 添加某topic的执行信息
function bindEvent(topic, {maxCount = 2, fn}) {
  if (!topic || !maxCount || !fn || typeof fn !== 'function') { throw new Error('add Event Error: lack of params') }
  if (maxCount <= 1) { throw new Error('add Event Error: maxCount cannot smaller than 1') }
  console.log('================bindEvent================', topic)
  // 是否存在该topic
  if (toDoList.has(topic)) {
    let { maxCount: _maxCount, fns } = toDoList.get(topic)
    fns.push(fn)
    toDoList.set(topic, { maxCount: _maxCount, fns })
    if (_maxCount === fns.length) {
      // console.log(`${topic} 执行=========>>>>>>`)
      // fns.forEach(fn => fn())
      fns[0]()
      // fns[0].apply(args, args)
      removeEvent(topic)
      console.log('================bindEvent destory================', topic)
    }
  } else {
    // 不存在该topic
    toDoList.set(topic, {maxCount, fns: [fn]})
  }
}

export {
  bindEvent,
  removeEvent,
  removeAllEvent
}
