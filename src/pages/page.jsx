import store from 'utils/store.js'
import { useSignal, useEffect } from 'my'
import { loadScript } from 'utils/loadScript'
import Home from './home/page'

const Loading = ()=><div>loading...</div>

function loadData(isLoaded) {
	let path = store.dataPath + '?' + new Date().getTime();
	checkData()
	loadScript(path).then((data) =>localStorage.mydata = JSON.stringify(data) )
	
	function checkData() {
		if (localStorage.mydata && (/version/i).test(localStorage.mydata)) {
			store.mydata = JSON.parse(localStorage.mydata)
			store.mytel = localStorage.mytel || store.mydata.mytel;
			store.myname = localStorage.myname || store.mydata.myname;
			store.mycity = localStorage.mycity || store.mydata.mycity;
			store.mymail = localStorage.mymail || store.mydata.mymail;
			isLoaded.value = true
			// store.initData()
		} else {
			setTimeout(checkData, 20)
		}
	}
}

function LoadingApp() {
	const isLoaded = useSignal(false)
	useEffect(()=>{
		loadData(isLoaded)
	}, [])
	return isLoaded.value ? <Home /> : Loading
}

export default LoadingApp

