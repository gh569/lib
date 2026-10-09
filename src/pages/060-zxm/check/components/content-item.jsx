import { useSignal } from '@preact/signals';
import styles from '../check.module.css';

export default function ContentItem({ dataItem, checkStore, refresh, selectedCountSignal }) {
	const editingItem = useSignal(false);
	const editedName = useSignal('');

	const cancelEdit = () => {
		editingItem.value = false;
	};

	const toggleItem = item => {
		const wasChecked = item.checked;
		checkStore.toggleItemChecked(item);
		if (wasChecked && !item.checked && editingItem.value) {
			cancelEdit();
		}

		refresh();
	};

	const setEditedName = val => (editedName.value = val);

	const getSelectedCount = () => {
		selectedCountSignal.value = checkStore.getSelectedCount();
	};

	// --- 提取到组件内部的 Handlers ---
	const updateDescription = (item, value) => {
		checkStore.updateItemDescription(item, value);
	};

	const startEditProjectName = item => {
		editingItem.value = true;
		editedName.value = item.项目;
	};

	const saveEditedName = item => {
		checkStore.updateItemName(item, editedName.value);
		editingItem.value = false;
	};

	const handleKeyDown = (e, item) => {
		if (e.key === 'Enter') {
			saveEditedName(item);
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	};

	const onItemChange = () => {
		toggleItem(dataItem);
		getSelectedCount();
	};

	return (
		<>
			<label className={styles.itemLabel}>
				<input type="checkbox" checked={dataItem.checked} onChange={onItemChange} className={styles.checkboxInput} />
				{editingItem.value ? (
					<input
						type="text"
						value={editedName.value}
						onInput={e => setEditedName(e.target.value)}
						onBlur={() => saveEditedName(dataItem)}
						onKeyDown={e => handleKeyDown(e, dataItem)}
						autoFocus
						className={styles.editInput}
					/>
				) : (
					<span style={{ fontWeight: dataItem.checked ? '600' : 'normal', cursor: 'pointer' }} onClick={() => startEditProjectName(dataItem)}>
						{dataItem['项目']}
					</span>
				)}
			</label>

			{dataItem.checked && (
				<div>
					<textarea value={dataItem.说明} placeholder="请输入说明..." onChange={e => updateDescription(dataItem, e.target.value)} className={styles.descriptionInput} />
				</div>
			)}
		</>
	);
}
