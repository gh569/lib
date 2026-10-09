import {loadScript} from 'utils/loadScript'

const path='https://env-00jxhocqgh3m-static.normal.cloudstatic.cn/preact1/use/lib/xlsx.full.min.js'


function read(file) {
	return new Promise(function (rev, rej) {
		let reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = function (e) {
			let d = e.target.result;
			let wb = XLSX.read(d, {
				type: 'binary',
			});
			let wsname = wb.SheetNames[0];
			let ws = wb.Sheets[wsname];
			let res = XLSX.utils.sheet_to_json(ws);
			rev(res);
		};
	});
}

export async function readXlsx(file){
  if(typeof XLSX=='undefined' ){
    await loadScript(path)
  }
  let res=await read(file)

  return res
}