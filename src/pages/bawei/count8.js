const newValue = 'newValue';
const oldValue = 'oldValue';

const n30 = 30; //回单总数
const n29 = 29; //检查日志篇数
const n28 = 28; //回单换算
const n27 = 27; //好评总数
const n26 = 26; //nps值
const n25 = 25; //回访满意度负面数量
const n24 = 24; //小程序满意度负面数量
const n23 = 23; //重大投诉数量
const n22 = 22; //投诉数量
const n21 = 21; //反馈数量
const n20 = 20; //人工检查日志得分
const n19 = 19; //人工检查日志有问题数
const n18 = 18; //回访服务类不认可数量
const n17 = 17; //上门总数
const n16 = 16; //回单得分
const n15 = 15; //表扬得分
const n14 = 14; //NPS得分
const n13 = 13; //满意度得分
const n12 = 12; //投诉得分
const n11 = 11; //	专业能力得分
const n10 = 10; //服务能力得分
const n9 = 9; //	人效得分
const n8 = 8; //效果得分
const n7 = 7; //	质量得分
const n6 = 6; //效率得分
const n5 = 5; //	总分
const n4 = 4; //当年计算月份

// 8维分计算
export function count_8wei(res1) {
	const hd_jg = 0.026; //回单及格分数2.6%
	const hd_100 = 0.05; //回单满分5%
	const by_jg = 0.0191; //表扬及格分数2.6%
	const by_100 = 0.05; //表扬满分5%
	const nps_100 = 1; //nps满分100
	const nps_90 = 0.9; //90分及格
	const nps_0 = 0.5; //50分为0分

	var res = res1.map((v) => v[newValue]);

	main();

	function main() {
		rxDF();
		fwnl();
		zynl()
		xlDF();

		npsDF();
		MYD();
		tsDF();
		zlDF();

		huidanDF();
		biaoyangDF();
		xiaoguoDF();
		zongfen();
		res1.forEach((v, i) => {
			v[newValue] = res[i];
		});
	}

	function isPY() {
		let city = res[1];
		let py = ['深圳', '广州', '武汉'];
		return py.includes(city);
	}

	/**
	 * 效率
	 */

	//效率得分
	function xlDF() {
		let a = res[n9];
		let b = res[n10];
		let c = res[n11];
		let r = a * 0.5 + b * 0.1 + c * 0.4;
		res[n6] = r.toFixed(2);
	}

	//人效得分
	function rxDF() {
		let xlcs = 100;
		if (isPY()) xlcs = 150;

		let cs = res[n17];
		let yue = res[n4];
		let r = (cs / (yue * xlcs)) * 100;
		if (r > 100) r = 100;
		res[n9] = r.toFixed(2);
	}

	//服务能力
	function fwnl() {
		const JG = 0.0023;
		const MAX = 0.05;
		let t1 = res[n18];
		let t2 = t1 / res[n17];
		let r;
		if (t2 >= MAX) {
			r = 0;
		} else if (t2 >= JG) {
			r = ((MAX - t2) / (MAX - JG)) * 60;
		} else {
			r = ((JG - t2) / JG) * 40 + 60;
		}
		res[n10] = r.toFixed(2);
	}

	// 日志人工检查
	function rgjc() {
		let t = res[19] / res[29]
		let r = res[20]
		if (t <= 0.05) {
			r = 100
		} else if (t > 0.05 && t <= 0.15) {
			r = 60 + 40 * (0.15-t) / 0.1
		} else if (t > 0.15 && t <= 2) {
			r = 60 * (2 - t) / (2 - 0.15)
		} else {
			r = 0
		}
		r = r.toFixed(2)
		res[n20] = r
	}

	// 专业能力
	function zynl() {
		if (parseInt(res[n29]) > 0) {
			rgjc()
			res[n11] = (res[n20] * 0.6 + 40).toFixed(2)
		} else {
			res[n20] = res1[n20][oldValue]
			res[n11] = res1[n11][oldValue]
		}
	}

	/****************************************
		*
		质量
		*******************************************
		*/

	//质量得分总计
	function zlDF() {
		let t1 = res[n12] * 0.5 + res[n13] * 0.2 + res[n14] * 0.3;
		res[n7] = t1.toFixed(2);
	}

	//nps值
	function npsDF() {
		let a = res[n26];
		let r;
		if (a >= 100) {
			r = 100;
		} else if (a >= 90) {
			r = ((a - 90) / 10) * 40 + 60;
		} else if (a >= 50) {
			r = ((a - 50) / 40) * 60;
		} else {
			r = 0;
		}
		res[n14] = r.toFixed(2);
	}

	//满意度
	function MYD() {
		const JG = 0.0043;
		const MAX = 0.05;
		let t1 = res[n25] + res[n24];
		let t2 = t1 / res[n17];
		let r;
		if (t2 >= MAX) {
			r = 0;
		} else if (t2 >= JG) {
			r = ((MAX - t2) / (MAX - JG)) * 60;
		} else {
			r = ((JG - t2) / JG) * 40 + 60;
		}
		res[n13] = r.toFixed(2);
	}

	//投诉得分
	function tsDF() {
		const JG = 0.0025;
		const MAX = 0.05;
		let t1 = res[n21] + res[n22] * 2 + res[n23] * 4;
		let t2 = t1 / res[n17];
		let r;
		if (t2 >= MAX) {
			r = 0;
		} else if (t2 >= JG) {
			r = ((MAX - t2) / (MAX - JG)) * 60;
		} else {
			r = ((JG - t2) / JG) * 40 + 60;
		}
		res[n12] = r.toFixed(2);
	}

	/********************************
			效果得分
			***********************************
			*/
	//效果得分
	function xiaoguoDF() {
		res[n8] = (res[n16] * 0.8 + res[n15] * 0.2).toFixed(2);
	}

	//计算回单得分
	function huidanDF() {
		var t1, t2;

		let h_100 = hd_100;
		let h_jg = hd_jg;

		t1 = res[n28] / res[n17];

		if (isPY()) {
			h_100 = 0.075;
			h_jg = 0.039;
		} else {
			h_100 = 0.06;
			h_jg = 0.027;
		}

		if (t1 >= h_100) {
			t2 = 100;
		} else if (t1 >= h_jg) {
			t2 = ((t1 - h_jg) / (h_100 - h_jg)) * 40 + 60;
		} else {
			t2 = (t1 / h_jg) * 60;
		}
		res[n16] = t2.toFixed(0);
	}
	//表扬得分
	function biaoyangDF() {
		var t1, t2;
		t1 = res[n27] / res[n17];

		if (t1 >= by_100) {
			t2 = 100;
		} else if (t1 >= by_jg) {
			t2 = ((t1 - by_jg) / (by_100 - by_jg)) * 40 + 60;
		} else {
			t2 = (t1 / by_jg) * 60;
		}
		res[n15] = t2.toFixed(2);
	}

	/*************
	 *************/
	//总分
	function zongfen() {
		let xldf = res[n6];
		let zldf = res[n7];
		let xgdf = res[n8];
		res[n5] = (xldf * 0.4 + zldf * 0.2 + xgdf * 0.4).toFixed(2);
		for (let i = 4; i < res.length; i++) {
			res[i] = parseFloat(res[i].toString());
		}
	}
}