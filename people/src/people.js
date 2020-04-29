import './set-public-path.js'
import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import root from './root.component.jsx'

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: root,
  domElementGetter,
})

export const bootstrap = [
  // () => {
  //   return setPublicPath()
  // },
  reactLifecycles.bootstrap,
]

// export const mount = [
//   reactLifecycles.mount,
// ]

export function mount(props) {
  console.log(props); // 可以在 app1 中获取到authToken参数
  return reactLifecycles.mount(props);
}

export const unmount = [
  reactLifecycles.unmount,
]

export const unload = [
  reactLifecycles.unload,
]

function domElementGetter() {
  let el = document.getElementById("people");
  if (!el) {
    el = document.createElement('div');
    el.id = 'people';
    document.body.appendChild(el);
  }

  return el;
}