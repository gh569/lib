import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import checkStore from './check-store.js';
import styles from './check.module.css';
import dialog from '@utils/dialog.js';
import Copy from './components/copy/copy.jsx';

// 引入子组件
import TabNav from './components/tab-nav.jsx';
import HeaderSection from './components/header-section.jsx';
import AddSpaceModal from './components/add-space-modal.jsx';
import ContentSection from './components/content-section.jsx';
import FloatingButton from './components/floating-button.jsx';

/**
 * Check 组件 - 主要的检查功能组件
 */
export default function Check() {
	const checkData = useSignal(checkStore.getData());
	const activeTab = useSignal('');
	const showHeader = useSignal(true);
	const showAddSpaceModal = useSignal(false);
	const newSpaceName = useSignal('');
	const selectedOriginalSpaces = useSignal([]);
	const selectedCount = useSignal(0);

	const checkedHeaders = useSignal([]);

	// --- Effects ---
	
	// 1. 当 checkData 或 activeTab 变化时，初始化 activeTab
	useEffect(() => {
		if (!activeTab.value && checkData.value.header.length > 0) {
			const firstChecked = checkData.value.header.find(item => item.checked);
			activeTab.value = firstChecked ? firstChecked.title : '';
		}
	}, [checkData.value, activeTab.value]);

	// 2. 订阅 checkStore 的变化，并同步到 checkData
	useEffect(() => {
		const unsubscribe = checkStore.subscribe(() => {
			checkData.value = checkStore.getData();

			if (activeTab.value) {
				const isActiveTabChecked = (checkData.value.header || []).some(header => header.title === activeTab.value && header.checked);
				if (!isActiveTabChecked) {
					const firstChecked = (checkData.value.header || []).find(item => item.checked);
					activeTab.value = firstChecked ? firstChecked.title : '';
				}
			}
		});
		return unsubscribe;
	}, []); // 空依赖数组：订阅只需在挂载时建立，取消订阅在卸载时执行


// 3. 根据 checkData 的变化更新 showHeader 和 selectedCount
	useEffect(() => {
		const len = checkStore.getCheckedHeaders().length;
		if (!showHeader.value) {
			showHeader.value = len === 0;
		}
		selectedCount.value = checkStore.getSelectedCount();
	}, [checkData.value]); // 依赖 checkData 的更新来触发计算


	// --- Handlers ---
	const copy = () => {
		const selectedItems = checkStore.getData().data.filter(item => item.checked);
		checkStore.setSelectedItems(selectedItems);
		checkStore.saveSelectionToLocalStorage();
		// 用弹窗代替路由跳转，渲染同一个 Copy 组件
		dialog.show(<Copy onClose={() => dialog.close()} />);
	};

	const toggleHeader = (index, tabTitle) => {
		if (checkStore.toggleHeaderChecked(index)) {
			activeTab.value = tabTitle;
		}
		showHeader.value = false;
	};

	const switchTab = tabTitle => {
		activeTab.value = tabTitle;
		showHeader.value = false;
	};

	const toggleHeaderVisibility = () => {
		showHeader.value = !showHeader.value;
		if(showHeader.value){
			window.scrollTo(0,0)
		}
	};

	// --- Getters ---
	const getCheckedHeaders = () => {
		const checkedHeaders = checkStore.getCheckedHeaders();
		const headerList = checkStore.getHeaderList();
		return checkedHeaders.sort((a, b) => {
			const indexA = headerList.indexOf(a.title);
			const indexB = headerList.indexOf(b.title);
			if (indexA === -1) return 1;
			if (indexB === -1) return -1;
			return indexA - indexB;
		});
	};

	// --- Modal Handlers ---
	const showAddSpace = () => {
		showAddSpaceModal.value = true;
		newSpaceName.value = '';
		selectedOriginalSpaces.value = [];
	};

	const hideAddSpace = () => {
		showAddSpaceModal.value = false;
	};

	const createCustomSpace = () => {
		if (!newSpaceName.value.trim()) return alert('请输入空间名称');
		if (selectedOriginalSpaces.value.length === 0) return alert('请选择至少一个原始空间');

		const newHeaderItem = {
			title: newSpaceName.value,
			checked: true,
			isCustom: true,
			selectionType: 'multiple',
			originalSpaces: [...selectedOriginalSpaces.value]
		};

		if (checkStore.addCustomSpace(newHeaderItem)) {
			hideAddSpace();
			switchTab(newSpaceName.value);
		}
	};

	const toggleOriginalSpaceSelection = spaceTitle => {
		const isSelected = selectedOriginalSpaces.value.includes(spaceTitle);
		if (isSelected) {
			selectedOriginalSpaces.value = selectedOriginalSpaces.value.filter(title => title !== spaceTitle);
		} else {
			selectedOriginalSpaces.value = [...selectedOriginalSpaces.value, spaceTitle];
		}
	};

	checkedHeaders.value = getCheckedHeaders();

	return (
		<div className={styles.container}>
			<div className={styles.stickyContainer}>
				{<TabNav checkedHeaders={checkedHeaders.value} activeTab={activeTab.value} switchTab={switchTab} showHeader={showHeader.value} toggleHeaderVisibility={toggleHeaderVisibility} />}

				{showAddSpaceModal.value && (
					<AddSpaceModal
						checkData={checkData.value}
						newSpaceName={newSpaceName.value}
						setNewSpaceName={val => (newSpaceName.value = val)}
						selectedOriginalSpaces={selectedOriginalSpaces.value}
						toggleOriginalSpaceSelection={toggleOriginalSpaceSelection}
						createCustomSpace={createCustomSpace}
						hideAddSpace={hideAddSpace}
					/>
				)}
			</div>

			<div>
				{showHeader.value ? (
					<HeaderSection
						checkData={checkData.value}
						toggleHeader={toggleHeader}
						showAddSpace={showAddSpace}
						generalSummary={checkStore.getGeneralSummary()}
						setGeneralSummary={val => checkStore.setGeneralSummary(val)}
					/>
				) : (
					checkedHeaders.value.map(headerItem => (
						<div key={headerItem.title} style={{ display: activeTab.value === headerItem.title ? 'block' : 'none' }}>
							
							<ContentSection
								headerTitle={activeTab}
								checkStore={checkStore}
								selectedCountSignal={selectedCount}
							/>
						</div>
					))
				)}
			</div>
			{selectedCount.value > 0 && !showAddSpaceModal.value && <FloatingButton count={selectedCount.value} copy={copy} />}
		</div>
	);
}
