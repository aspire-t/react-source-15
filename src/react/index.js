import { TEXT, ELEMENT } from './constants'
import { ReactElement } from './vdom'
function createElement(type, config = {}, ...children) {
  delete config.__source
  delete config.__self
  let { key, ref, ...props } = config
  let $$typeof = null
  if (typeof type === 'string') {
    // span div button
    $$typeof = ELEMENT // 是一个原生的DOM类型
  }
  props.children = children.map((item) => {
    if (typeof item == 'object') {
      return item // React.createElement('span', { color: 'red' }, 'hello')
    } else {
      return { $$typeof: TEXT, type: TEXT, content: item } // 这里就像 item = "Hello"
    }
  })
  // 这一步是改造父级节点的
  return ReactElement($$typeof, type, key, ref, props)
}

const React = {
  createElement,
}

export default React
