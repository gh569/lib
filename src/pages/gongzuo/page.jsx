
import {useSignal} from'my'
import { copyToClipboard } from 'utils/copyToClipboard.js';
import store from 'utils/store.js'
import FixButton from 'com/fix-button.jsx';
import style from '../home/gy/gy.module.css';

const thisTab = 'tab-pqgz';
let refRng;

export default function Peiqian() {
	const thisData = useSignal(store.getDataByName(thisTab));
	const contentIndex = useSignal(1);

	const cpyClick = () => {
		if (typeof uni != 'undefined') {
			uni.setClipboardData({
				data: refRng.innerText,
				success: (r) => {},
			});
		} else {
			copyToClipboard(refRng.innerText);
		}
	};

	return <div>
			<div className={style.content}>
				{thisData.value
					.filter((t) => t.grade[0]  && !t.grade[1] )
					.map((t) => {
						return		<div
								className={t.grade[0] == contentIndex.value ? `${style.contentItem} selected` : style.contentItem}
								onClick={(e) => {
									contentIndex.value = t.grade[0];
								}}
							>
								{t.value}
							</div>
					})}
			</div>
			<div className={style.text} ref={(e) => (refRng = e)}>
				<pre>{thisData.value.filter((t) => t.grade[0] === contentIndex.value && !t.grade[2]  && t.grade[1] == 1).map((t) => t.value.replace(/\t/g, '  '))}</pre>
				<ul>
					{thisData.value
						.filter((t) => t.grade[0] == contentIndex && !t.grade[2]  && t.grade[1] > 1)
						.map(
							(t, i) =><li>{i + 1}{'. '}{t.value.replace(/\t/g, '  ')}</li>
						)}
				</ul>
			</div>
			<FixButton  onClick={cpyClick} value='复制' type='1' />
		</div>
}
