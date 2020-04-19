/**
 * 在React我们并不是把事件绑在要绑定的DOM节点上，而绑定到document 类似于事件委托
 * 1. 因为合成事件可以屏蔽浏览器的差异，不同浏览器绑定事件和触发事件的方式不一样
 * 2. 合成事件可以实现事件对象复用，重用，减少垃圾回收，提高性能
 * 3. 因为默认我要实现批量更新  setState  setState 两个 setState 合并成一次更新，这个也试在合成事件中实现
 * @param {*} dom 要绑定事件的dom节点
 * @param {*} key 事件的类型 onClick onChange
 * @param {*} value 事件的处理函数
 */
export function addEvent(dom, eventType, listener) {
  eventType = eventType.toLowerCase() // onClick => onclick
  // 在要绑定的DOM节点上挂载一个对象，准备存放监听函数
  let eventStore = dom.eventStore || (dom.eventStore = {})
  // eventStore.onclick = () => {alert ('hello')}
  eventStore[eventType] = listener
  // document.addEventListener('click')
  // 第一阶段是捕获，第2阶段是冒泡，false是冒泡阶段处理
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}
// 真正事件触发的回调函数统一是这个dispatchEvent方法
// event 就是原生DOM事件对象，但是传递给我们的监听函数的并不是它
let syntheticEvent
function dispatchEvent(event) {
  let { type, target } = event // type = click target = button
  let eventType = 'on' + type //onclick
  debugger

  // 如果没有，就创建新的事件对象
  syntheticEvent = getSyntheticEvent(event) // 在此处给syntheticEvent赋值
  while (target) {
    let { eventStore } = target
    let listener = eventStore && eventStore[eventType] // onclick
    if (listener) {
      // 执行监听函数
      listener.call(target, syntheticEvent)
    }
    target = target.parentNode
  }
  // 等所有的监听函数执行完了，就可以清掉所有的属性了，供下次复用此syntheticEvent对象
  for (let key in syntheticEvent) {
    // if (key !== 'persist') {
    //   syntheticEvent[key] = null
    // }
    if (syntheticEvent.hasOwnProperty(key)) {
      delete syntheticEvent[key]
    }
  }
}
// 如果说执行了persist，就让syntheticEvent指向了新对象，while循环结束之后再清除的是新对象的属性
function persist() {
  // 重新赋值，就切断了原对象的引用，清空的是新对象
  syntheticEvent = { persist }
}

function getSyntheticEvent(nativeEvent) {
  // 第一次才会创建，以后就不会创建，始终会是同一个对象
  if (!syntheticEvent) {
    syntheticEvent = {}
    syntheticEvent.__proto__.persist = persist
  }

  syntheticEvent.nativeEvent = nativeEvent
  syntheticEvent.currentTarget = nativeEvent.target
  //把原生事件对象上的方法和属性都拷贝到了合成对象上
  for (let key in nativeEvent) {
    if (typeof nativeEvent[key] === 'function') {
      syntheticEvent[key] = nativeEvent[key].bind(nativeEvent)
    } else {
      syntheticEvent[key] = nativeEvent[key]
    }
  }
  return syntheticEvent
}
