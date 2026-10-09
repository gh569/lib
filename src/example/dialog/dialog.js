/* version = v1.0 */

import { h, render } from 'preact';
import { signal } from '@preact/signals';
const Dialog = {}
const coms = signal([])
const initData = 1001
const zIndex = signal(initData)
const div = document.createElement('div')
document.body.appendChild(div)

const styles = {
	position: 'fixed',
	left: '0px',
	top: '0px',
	width: '100%',
	height: '100%',
	backgroundColor: '#ffffff',
	zIndex: 999,
	overflow: 'auto'
};

window.addEventListener('popstate', function(e) {
	let index = e.state?.zIndex || 0
	if (index < zIndex.value) {
		coms.value.pop()
		zIndex.value--
		coms.value = [...coms.value]
	} else if(index>zIndex.value){
		history.back()
	}
})

function App(){
	return coms.value.map((com,i,arr)=>h(
		'div',{style:{...styles,visibility:(i===arr.length-1)?'visible':'hidden'}},h(com.fn)
	))
}
render(h(App),div)

/**
 * 
 * @param {Object} fn:组件
 * @param {Object} replace=true,替换当前页面
 */
Dialog.show = function(fn, replace) {
	let state = window.history.state || {}
	zIndex.value++
	state.zIndex = zIndex.value
	coms.value=[...coms.value,{fn:fn,zIndex:zIndex.value}]
	if(replace){
		window.history.replaceState(state,null,document.URL)
	}else{
		window.history.pushState(state, null, document.URL)
	}
}

export { Dialog, Dialog as default }