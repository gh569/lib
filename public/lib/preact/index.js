import {h,render,Component} from'preact'
import { useEffect,useRef } from 'preact/hooks'
import {signal,computed,useComputed,useSignal,useSignalEffect,effect,batch} from '@preact/signals'
import htm from 'htm'
import {Router,Route,route,Link} from 'preact-router'
import {createHashHistory,createBrowserHistory} from 'history'
const html=htm.bind(h)
const Preact=window.Preact={
	h,
	render,
	Component,
	useEffect,
	useRef,
	signal,
	computed,
	useSignal,
	useComputed,
	effect,
	useSignalEffect,
	batch,
	html,
	Router,
	Route,
	route,
	Link,
	createHashHistory,
	createBrowserHistory,
}
export {
	Preact as default,
	h,
	render,
	Component,
	useEffect,
	useRef,
	signal,
	computed,
	useSignal,
	useComputed,
	effect,
	useSignalEffect,
	batch,
	html,
	Router,
	Route,
	route,
	Link,
	createHashHistory,
	createBrowserHistory,
}

