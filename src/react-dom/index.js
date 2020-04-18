import { createDOM } from '../react/vdom'

function render(element, container) {
  // 1. 要把虚拟dom 变成真实dom
  let dom = createDOM(element)
  // 2. 把真实dom 挂载到container上
  container.appendChild(dom)
}
export default {
  render,
}
