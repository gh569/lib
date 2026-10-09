
import {route} from 'my'
import style from "./other.module.css";

const contents = [
	['测试', '/example', false],
	['节点', '/jiedian', false],
	['关于', '/about', false],
	['8维', '/bawei', false],
	['提示', '/ts', false],
	['陪签工作', '/gongzuo', false],
	['陪签流程', '/liucheng', false],
	['omi7', 'http://omijs.org', true],
	['preact', 'https://preactjs.com/', true],
	['陪签记录表', 'https://www.kdocs.cn/wo/sl/v1SB1Up', true],
];

function Mc(content) {
	if (content[2]) {
		return 			<div className={style.item} onClick={()=>window.open(content[1],'_blank')}>
				<div className={style.itemContent}>{content[0]}</div>
				<div className={style.itemRight}>{'>'}</div>
			</div>
		
	} else {
		return 	<div className={style.item} onClick={() => route(content[1])}>
				<div className={style.itemContent}>{content[0]}</div>
				<div className={style.itemRight}>{'>'}</div>
			</div>
	}
}

export default function Other() {
	return 	<div className={style.body}>
				<div className={style.head}>首页</div>
				{contents.map((v) => Mc(v))}
		</div>
}
