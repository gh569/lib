
import { Signal, effect, signal } from "@preact/signals";
const allData=signal([])
const LogSummary='LogSummary'

function getDataByStep(step){
	let res={}
	let checkedValue=[]
	let contextValue=[]
	let store=''
	if(!allData.value.length ){
		store=localStorage.getItem(LogSummary)
		if(store && store!=='undefined') store=JSON.parse(store)
		if(Array.isArray(store)&& store.length>0) allData.value=store
	}
	if(allData.value[step]) res=allData.value[step]
	if(res.checkedValue) checkedValue=res.checkedValue
	if(res.contextValue) contextValue=res.contextValue
	return {checkedValue,contextValue}
}

function setDataByStep(step,data){
	allData.value[step]=data
	allData.value=[...allData.value]
	localStorage.setItem(LogSummary,JSON.stringify(allData.value) )
}

export {getDataByStep ,setDataByStep}