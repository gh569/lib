/**
 * 字符串替换
 * @param  args 为对象或者字符串
 * 示例
  var s1 = '我是{0}，今年{1}了'
  var s2 = '我是{name}，今年{age}了'
  console.log(s1.format('zhangsan', 20))
  console.log(s2.format({
    name: 'lisi',
	age: 30
  }))

  var s3 = "我是{}，今年{}了"
	var i = 0
	var s4 = s3.format("wangwu",17)
 console.log(s4)
 * 
 */

String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof(args) == "object") {
			for (let key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		} else {
			let key=0
			result = this.replace(/\{\}/gm, function(arg) {
				var res = arg[0] + key + arg[1]
				key = key + 1
				return res
			})
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result
}

/**
 * 日期格式化
 * @param {Object} fmt,字符串
 * 
 var s=new Date(79,5,24,11,33,0).format("MM月dd日");
 console.log(s)
 var now = new Date();
 var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
 console.log(nowStr)
 s=new Date().format("yyyy年MM月dd日");
 console.log(s)
 s = now.format("yyyy-MM-dd hh:mm:ss");
 console.log(s)
 s=new Date().format("yyyy年MM月dd日hh小时mm分ss秒");
 console.log(s)
 
 */

Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};

	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}

	return fmt;
}

/**
* 数组去重 Array.unique(arr)
* @param arr   需要处理的数组
* 示例
   arr = ['blue', 'green', 'blue', 'yellow', 'black', 'yellow', 'blue', 'green', 'blue', 'blue', 'blue'];
   console.log(arr.unique());       //输出：(4) ["blue", "green", "yellow", "black"]
*/

Array.prototype.unique = function() {
	return Array.from(new Set(this));
}

/**
 * 
 * @param {Object} obj
 */
function type(obj){
	return Object.prototype.toString.call(obj)
}