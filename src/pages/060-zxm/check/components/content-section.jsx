import styles from '../check.module.css';
import ContentItem from './content-item';
import ContentItemOnly from './content-item-only';
import { useSignal, useSignalEffect } from '@preact/signals';

export default function ContentSection({ headerTitle, checkStore, selectedCountSignal }) {
	// --- 提取到组件内部的状态变量 ---

	const currentTabData = useSignal([]);

	// --- 提取到组件内部的 Getters ---
	const getCurrentTabData = headerTitleVal => {
		return checkStore.getDataBySpace(headerTitleVal);
	};
	
	const refresh=()=>currentTabData.value=[...currentTabData.value]

	useSignalEffect(() => {
		// 当 headerTitle 改变时，更新 currentTabData
		currentTabData.value = getCurrentTabData(headerTitle.value);
	});

	const addNewProject = () => {
		const space = headerTitle.value;
		const projectName = prompt('请输入项目名称:');

		if (projectName !== null && projectName.trim() !== '') {
			checkStore.addNewItem(space, projectName);
			setTimeout(() => {
				const newItem = checkStore.getData().data.find(item => item.空间 === space && item.项目 === projectName.trim());
				if (newItem) {
					checkStore.toggleItemChecked(newItem);
					currentTabData.value = getCurrentTabData(space);
				}
			}, 0);
		}
	};

	// --- 渲染逻辑 ---
	// 您可以在这里使用上述定义的变量和函数进行渲染

	return (
		<div className={styles.contentSection}>
		
			<div>
				{currentTabData.value
					.filter(item => !item.分类)
					.map(dataItem => (
						<div key={`${dataItem.空间}_${dataItem['项目']}`} className={styles.itemContainer}>
							<ContentItem dataItem={dataItem} checkStore={checkStore} refresh={refresh} selectedCountSignal={selectedCountSignal}  />
						</div>
					))}
			</div>
			
			
			<div className={styles.addItemContainer}>
				<button onClick={addNewProject} className={styles.addButton}>
					+ 新增项目
				</button>
			</div>
			
			<div>
				{currentTabData.value
					.filter(item => item.分类)
					.map(item => {
						const dataItem = checkStore.checkData.onlyItems.find(i => i.项目 === item.项目);

						return (
							<div key={`其他_${dataItem['项目']}`} className={styles.itemContainer}>
								<ContentItemOnly dataItem={dataItem} checkStore={checkStore} refresh={refresh} selectedCountSignal={selectedCountSignal} />
							</div>
						);
					})}
			</div>
			
		</div>
	);
}
