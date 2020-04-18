// 如果obj是数组，只取第一个元素，如果不是数组，就返回自己
export function onlyOne(obj) {
  return Array.isArray(obj) ? obj[0] : obj
}
/**
 * 给真实dom节点赋予属性
 * @param {*} dom
 * @param {*} props
 */
export function setProps(dom, props) {
  for (let key in props) {
    if (key !== 'children') {
      let value = props[key]
      setProp(dom, key, value)
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    // 如果属性名以on开头，说明要时间绑定
    dom[key.toLowerCase()] = value
  } else if (key === 'style') {
    for (const styleName in value) {
      dom.style[styleName] = value[styleName]
    }
  } else {
    dom.setAttribute(key, value)
  }
}
