import { useSignal } from '@preact/signals';
import styles from '../check.module.css';

export default function ContentItemOnly({ dataItem, checkStore, refresh, selectedCountSignal }) {
	const toggleItem = item => {
		const wasChecked = item.checked;
		item.checked = !wasChecked;
		checkStore.notifyObservers();

		refresh();
	};

	const getSelectedCount = () => {
		selectedCountSignal.value = checkStore.getSelectedCount();
	};

	// --- 提取到组件内部的 Handlers ---
	const updateDescription = (item, value) => {
		item.说明 = value;
		checkStore.notifyObservers();
	};

	const onItemChange = () => {
		toggleItem(dataItem);
		getSelectedCount();
	};

	return (
		<>
			<label className={styles.itemLabel}>
				<input type="checkbox" checked={dataItem.checked} onChange={onItemChange} className={styles.checkboxInput} />
				<span style={{ fontWeight: dataItem.checked ? '600' : 'normal', cursor: 'pointer' }}>{dataItem['项目']}*****</span>
			</label>

			{dataItem.checked && (
				<div>
					<textarea value={dataItem.说明} placeholder="请输入说明..." onChange={e => updateDescription(dataItem, e.target.value)} className={styles.descriptionInput} />
				</div>
			)}
		</>
	);
}
