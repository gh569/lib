import { showLoading, hideLoading } from './show-loading';

// 全局缓存 XLSX 模块和加载状态
let XLSX = null;
let loadingPromise = null;

// 预加载函数
function preloadXLSX() {
  if (!XLSX && !loadingPromise) {
    loadingPromise = import('xlsx_url')
      .then(module => {
        XLSX = module;
        console.log('XLSX 模块预加载完成');
        return module;
      })
      .catch(err => {
        console.error('XLSX 模块加载失败:', err);
        loadingPromise = null;
        throw err;
      });
  }
  return loadingPromise;
}

// 修改读取函数以使用加载提示
async function read(file) {
	return new Promise(function (rev, rej) {
		let reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = async function (e) {
			let d = e.target.result;
			
			try {
				// 显示加载提示
				showLoading('正在处理Excel文件...');
				
				// 检查是否已有加载中的 Promise
				if (!XLSX) {
					if (!loadingPromise) {
						// 开始加载模块
						loadingPromise = import('xlsx_url')
							.then(module => {
								XLSX = module;
								return module;
							})
							.catch(err => {
								loadingPromise = null;
								throw err;
							});
					}
					// 等待模块加载完成
					showLoading('正在加载Excel处理库...');
					XLSX = await loadingPromise;
				}
				
				// 解析 Excel 文件
				showLoading('正在解析Excel文件...');
				let wb = XLSX.read(d, {
					type: 'binary',
				});
				let wsname = wb.SheetNames[0];
				let ws = wb.Sheets[wsname];
				let res = XLSX.utils.sheet_to_json(ws);
				rev(res);
			} catch (error) {
				console.error('Excel 处理错误:', error);
				rej(new Error(`Excel 处理失败: ${error.message || '未知错误'}`));
			} finally {
				// 隐藏加载提示
				hideLoading();
			}
		};
		reader.onerror = function (e) {
			hideLoading();
			rej(new Error(`文件读取失败: ${e.message || '未知错误'}`));
		};
	});
}

async function readXlsx(file){
  if (!file) {
    throw new Error('未选择文件');
  }
  
  let res = await read(file);
  return res;
}

export { readXlsx ,preloadXLSX};