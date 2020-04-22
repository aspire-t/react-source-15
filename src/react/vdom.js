import { TEXT, ELEMENT, CLASS_COMPONENT, FUNCTION_COMPONENT } from './constants'
import { onlyOne, setProps } from './utils'

export function ReactElement($$typeof, type, key, ref, props) {
  let element = { $$typeof, type, key, ref, props }
  return element
}

// 把虚拟dom变成真实dom
export function createDOM(element) {
  element = onlyOne(element) // 这里有一个伏笔 ，为什么这么写？因为children是一个数组
  let { $$typeof } = element
  let dom = null
  if (!$$typeof) {
    // element 是一个字符串或数字
    dom = document.createTextNode(element)
  } else if ($$typeof === TEXT) {
    // 对象{$$typeof:TEXT}
    dom = document.createTextNode(element.content)
  } else if ($$typeof === ELEMENT) {
    // 如果此虚拟dom是原生dom节点
    dom = createNativeDOM(element)
  } else if ($$typeof === FUNCTION_COMPONENT) {
    // 如果此虚拟dom是一个函数组件，就渲染此函数组件
    dom = createFunctionComponentDOM(element)
  } else if ($$typeof === CLASS_COMPONENT) {
    // 如果此虚拟dom是一个类组件，就渲染此类组价
    // dom = createClassComponentDOM(element)
  }
  return dom
}
// 创建函数组件对应的真实的DOM对象
function createFunctionComponentDOM(element) {
  let { type, props } = element // type = FunctionComponent
  let renderElement = type(props) // 返回要渲染的react元素
  let newDOM = createDOM(renderElement)
  return newDOM
}

function createNativeDOM(element) {
  let { type, props } = element
  let dom = document.createElement(type) // <button></button> 真实的BUTTON DOM元素
  // 1. 创建此虚拟dom节点的子节点
  createNativeDOMChildren(dom, element.props.children)
  // 更新属性
  setProps(dom, props)
  // 2. 给此DOM元素添加属性
  return dom
}

function createNativeDOMChildren(parentNode, children) {
  // 儿子可能是个多维数组，所以需要打平
  children &&
    children.flat(Infinity).forEach((child) => {
      // 此处递归了
      let childDOM = createDOM(child) // 创建子虚拟DOM节点的真实DOM元素
      parentNode.appendChild(childDOM)
    })
}
