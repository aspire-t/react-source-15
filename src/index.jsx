import React from './react'
import ReactDOM from './react-dom'

// 虚拟dom
// let onClick = (event) => {
//   console.log(event)
//   event.persist()
//   // setInterval(() => {
//   //   console.log(event)
//   // }, 1000)
// }

// let element = (
//   <button id="sayHello" onClick={onClick}>
//     say<span color="red">Hello</span>
//   </button>
// )
// let element = React.createElement(
//   'button',
//   { id: 'sayHello', onClick },
//   'say',
//   React.createElement('span', { style: { color: 'red' } }, 'hello')
// )
// console.log(element)
//渲染的时候，有可能是个字符串   ReactDOM.render('hello', document.getElementById('root'))

// 如何渲染类组件和函数组件

class ClassComponent extends React.Component {
  render() {
    return React.createElement('div', { id: 'counter' }, 'hello')
  }
}

// function FunctionContainer() {
//   return React.createElement('div', { id: 'counter' }, 'hello')
// }

let element1 = React.createElement('div', { id: 'counter' }, 'hello')

let element2 = React.createElement(ClassComponent)
// let element3 = React.createElement(FunctionContainer)
ReactDOM.render(element2, document.getElementById('root'))
