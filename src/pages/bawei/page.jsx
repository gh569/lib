
import { signal } from 'my'
import { readXlsx } from './read-xlsx.js';
import { count_8wei } from './count8.js';
import style from './bawei.module.css';


const index = 'index';
const title = 'title';
const oldValue = 'oldValue';
const newValue = 'newValue';

const n30 = 30; //回单总数
const n29 = 29; //检查日志篇数
const n28 = 28; //回单换算
const n27 = 27; //好评总数

const n17 = 17; //上门总数
const n16 = 16; //回单得分

const data = {
	names: [], //所有监理姓名
	select: null, //select元素
	curIndex: 0,
	score: [],
	result: [],
	huidan: [],
	taocan: ['基础版', '标准版', '升级版', '省心版', '高级版', '尊享版'],
};

const thisData = signal(checkResult(data.result));
const oldHd = signal(0)
const field = signal(n17)


export default function Bawei() {

	function onFileChange(e) {
		try {
			var file = e.target.files[0];
			readXlsx(file).then((d) => {
				data.score = d.map((t, i) => {
					data.names[i] = t['姓名'];
					return { ...t };
				});
				resultInit();
				oldHd.value = data.result[n28][newValue]
				thisData.value = [...data.result]
			});
		} catch (err) {}
	}

	function onSelectChange(e) {
		data.curIndex = parseInt(e.target.value);
		resultInit();
		oldHd.value = data.result[n28][newValue]
		thisData.value = [...data.result]
	}

	function onInput(n, e) {
		data.result[n][newValue] = parseInt(e.target.value);
		if (isNaN(data.result[n][newValue])) data.result[n][newValue] = 0;
		count_8wei(data.result);
		thisData.value = [...data.result]
	}

	function onHdInput(i, e) {
		let huidan = data.huidan;
		huidan[i] = parseInt(e.target.value);
		if (isNaN(huidan[i])) huidan[i] = 0;
		data.result[n28][newValue] = hd_count(huidan);
		data.result[n30][newValue] = hd_total(huidan);
		count_8wei(data.result);
		thisData.value = [...data.result]
	}

	return <div>
			<div className={style.baweiFull}>
				<div className={style.left}>
					<table>
						{thisData.value.map((v, i) => {
							return 								<tr className={i % 2 == 0 ? '' : style.leftText}>
									<td style="width:30px">{v[index]}</td>
									<td style='width:140px'>{v[title]}</td>
									<td style='width:65px'>{v[oldValue]}</td>
									<td style='width:55px' className={v[newValue] == v[oldValue] ? '' : style.resultDef}>{v[newValue]}</td>
								</tr>
						})}
					</table>
				</div>
				<div className={style.right}>
					<br />
					<input className={style.rightFile} type="file" onChange={(e) => onFileChange(e)} />
					<div>
						<br />
						<select size="12" className={style.selectName} ref={(e) => (data.select = e)} onChange={(e) => onSelectChange(e)}>
							{data.names.map(
								(t, i) => <option value={i} selected={i == data.curIndex ? true : false}>{t}</option>
							)}
						</select>
					</div>
					<div>
						<div className={style.rightItem}>
							<div className={style.rightItemTitle}>好 评：</div>
							<input type="text" className={style.rightItemInput} value={thisData.value[n27][newValue]} onInput={(e) => onInput(n27, e)} />
						</div>
						<div className={style.rightItem}>
							<div className={style.rightItemTitle}>次 数：</div>
							<input type="text" className={style.rightItemInput} value={thisData.value[n17][newValue]} onInput={(e) => onInput(n17, e)} />
						</div>
						回单：
						{data.huidan.map((v, i) => {
							return <div className={style.rightItem}>
									<div className={style.rightItemTitle}>{data.taocan[i]}</div>
									<input type="text" className={style.rightItemInput} value={v} onInput={(e) => onHdInput(i, e)} />
								</div>
						})}
					</div>
					<div className={style.rightItem}>
						<div >
							<select style='width:100px' value={field.value} onChange={(e)=>field.value=e.target.value}>
								{thisData.value.filter(v=>(v.index>=17 && v.index<=29)).map(v=>									<option value={v.index}>{v.title}</option>
								)}
							</select>
						</div>
					</div>
					<div className={style.rightItem}>
						<input type="text" className={style.rightItemInput} value={thisData.value[field.value][newValue]} onInput={(e) => onInput(field.value, e)} />
					</div>
				</div>
			</div>
      </div>
}

// 数据初始话
function resultInit() {
	var score = data.score[data.curIndex];
	var res = Object.keys(score).map((v, i) => {
		return {
			index: i,
			title: v.length > 8 ? (v.substring(0, 7) + '...') : v,
			oldValue: score[v],
			newValue: i >= 4 ? parseFloat(score[v]) : score[v],
		};
	});

	res[1][newValue] = res[0][newValue];
	res[0] = {
		index: '',
		title: '',
		oldValue: '',
		newValue: '',
	};
	res[2] = {
		index: '',
		title: '',
		oldValue: '',
		newValue: '',
	};
	res[3] = {
		index: '',
		title: '',
		oldValue: '',
		newValue: '',
	};
	res.push({
		index: 29,
		title: '日志检查次数',
		oldValue: '0',
		newValue: '0',
	});
	res.push({ ...res[28] })
	let huidan = huidan_fenlei(res);
	data.huidan = [...huidan];
	res[28].title = '回单换算'
	res[n28][oldValue] = res[n28][newValue] = hd_count(huidan);
	res[30].index = 30
	count_8wei(res);
	data.result = res;
}

// 检测数据是否合格
function checkResult(res) {
	if (!Array.isArray(res)) {
		res = [];
	}
	for (let i = 0; i <= 29; i++) {
		if (typeof res[i] != 'object') res[i] = {};
		res[i][index] = res[i][index] ?? '';
		res[i][title] = res[i][title] ?? '';
		res[i][oldValue] = res[i][oldValue] ?? '';
		res[i][newValue] = res[i][newValue] ?? '';
	}
	return res;
}

// 回单分类估算
function huidan_fenlei(data1) {
	const weidu_max = 6;
	var result = [0, 0, 0, 0, 0, 0];
	const data = copy(data1);
	const count = data[n28][newValue];
	fn(result, count, 0);
	return result;

	function copy(d) {
		let i, j;
		let r = [];
		for (i in d) {
			r[i] = {};
			for (j in d[i]) {
				r[i][j] = d[i][j];
			}
		}
		return r;
	}

	function fn(res, max, weidu) {
		let r = [...res];
		let scr;
		if (weidu == weidu_max - 1) {
			r[weidu] = max;
			scr = hd_count(r);
			data[n28][newValue] = scr;
			count_8wei(data);
			if (Math.abs(data[n16][newValue] - data1[n16][newValue]) < 1) {
				result = r;
				return true;
			} else {
				return false;
			}
		}
		for (let i = max; i >= 0; i--) {
			r[weidu] = i;
			let m = fn(r, max - i, weidu + 1);
			if (m) return true;
		}
	}
}

// 回单换算
function hd_count(r) {
	return r[0] + r[1] * 1.5 + r[2] * 2 + r[3] * 3 + r[4] * 4 + r[5] * 5;
}

// 回单统计
function hd_total(r) {
	return r[0] + r[1] + r[2] + r[3] + r[4] + r[5];
}