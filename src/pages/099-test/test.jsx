
import {useEffect} from 'preact/hooks'
import { useSignal } from '@preact/signals'

export default function Test(){
	const data=useSignal('No Data!')
	useEffect(()=>{
		async function loadHello() {
		  try {
		    const res = await fetch("http://localhost:8787/api/hello");
		
		    if (!res.ok) {
		      console.error("状态码错误", res.status);
		      return;
		    }
		
		    const res1 = await res.json();
				data.value=JSON.stringify(res1)
		  } catch (err) {
		    console.error("请求失败", err);
		  }
		}
		loadHello()
	},[])
	
	return (<div>
		{data.value}
	</div>)
}