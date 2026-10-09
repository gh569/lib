import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { copyToClipboard } from '@utils/copy-to-clipboard';
import { replacePlaceholders } from '@utils/replace-placeholders';
import { useTagData } from '@utils/use-tag-data';
import ListItem from '@com/list-item';
import style from './ht.module.css';
import FixButton from '@com/fix-button';

const THIS_TAB = 'pqgz';

export default function Peiqian() {
	const thisData = useTagData(THIS_TAB);
	const contentIndex = useSignal(2);
	const textRef = useSignal(null);
	const listItems = useSignal([]);
	const selectedCount = useSignal(0);

	useEffect(() => {
		listItems.value = thisData.value
			.filter(item => item.grade[0] === contentIndex.value && !item.grade[2] && item.grade[1] >= 0)
			.map(item => {
				// 查找对应的子项，使用可选链(?.)简化取值
				const child = thisData.value.find(i => i.grade[0] === item.grade[0] && i.grade[1] === item.grade[1] && i.grade[2]);
				return {
					value: replacePlaceholders(child?.value ?? item.value),
					title: child ? item.value : '',
					key: `${item.grade[0]}-${item.grade[1]}`
				};
			});
	}, [thisData.value]);

	useEffect(() => {
		selectedCount.value = listItems.value.filter(item => item.checked).length;
	}, [listItems.value]);

	const copy = () => {
		const selectedItems = listItems.value.filter(item => item.checked).map((item, index) => `\t${index + 1}.\t${item.value}`);
		const text = selectedItems.join('\n');
		copyToClipboard(text);
		setTimeout(reset, 10);
	};

	const toggleChecked = item => {
		item.checked = !item.checked;
		listItems.value = [...listItems.value];
	};

	const reset = () => {
		listItems.value = listItems.value.map(item => ({ ...item, checked: false }));
	};
	return (
		<div>
			<div className={style.text1} ref={el => (textRef.value = el)}>
				{listItems.value.map(item => (
					<div className={style.itemContainer}>
						<ListItem
							key={item.key}
							onClick={() => toggleChecked(item)}
							title={
								<div className={style.textItem} >
									<input type="checkbox" checked={!!item.checked} />
									<div className={style.textTitle}>{item.value}</div>
									
								</div>
							}
						/>
						{!selectedCount.value && (
							<button onClick={() => copyToClipboard(item.value)} className={style['copy-btn']}>
								{'复制'}
							</button>
						)}
					</div>
				))}
			</div>
			{selectedCount.value > 0 && <FixButton value={selectedCount.value} onClick={copy}>❏</FixButton>}
		</div>
	);
}
