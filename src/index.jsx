import React from './react'
import ReactDOM from './react-dom'

let onClick = (event) => {
  console.log(event)
  event.persist()
  // setInterval(() => {
  //   console.log(event)
  // }, 1000)
}

// let element = (
//   <button id="sayHello" onClick={onClick}>
//     say<span color="red">Hello</span>
//   </button>
// )
let element = React.createElement(
  'button',
  { id: 'sayHello', onClick },
  'say',
  React.createElement('span', { style: { color: 'red' } }, 'hello')
)
console.log(element)
//渲染的时候，有可能是个字符串   ReactDOM.render('hello', document.getElementById('root'))
ReactDOM.render(element, document.getElementById('root'))
