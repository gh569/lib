import checkStore from '../../check-store.js';
import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import copyToClipboard from '@utils/copy-to-clipboard.js';
import styles from './copy.module.css';

// 中文数字映射扩展到20
const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];

export default function Copy({ onClose }) {
	const data = useSignal(checkStore.getSelectedItems() || []);
	const editableContent = useSignal('');
	// 复制成功状态：驱动按钮的 success 类名与图标
	const copied = useSignal(false);

	// 生成格式化内容
	const generateContent = () => {
		if (data.value.length === 0) return '';

		// 按空间分组数据
		const groupedData = data.value.reduce((acc, item) => {
			const space = item.空间;
			if (!acc[space]) {
				acc[space] = [];
			}
			acc[space].push(item);
			return acc;
		}, {});

		// 获取排序后的空间列表，按照checkStore中selectedHeader的顺序，并过滤掉不在selectedHeader中的空间
		const selectedHeader = checkStore.getHeaderList();
		const spaces = selectedHeader.filter(space => groupedData[space]);

		// 生成内容文本
		let contentText = '';
		spaces.forEach((space, spaceIndex) => {
			const items = groupedData[space];
			contentText += `${chineseNumbers[spaceIndex] || spaceIndex + 1}、${space}\n`;
			items.forEach((item, itemIndex) => {
				contentText += `  ${itemIndex + 1}. ${item.项目}: ${item.说明}\n`;
			});
			// 每个大类之间留空行
			contentText += '\n';
		});

		const onlyItems = checkStore.checkData.onlyItems.filter(item => item.checked);

		if (onlyItems.length) {
			contentText += `${chineseNumbers[spaces.length] || spaces.length + 1}、其他\n`;
			onlyItems.forEach((item, itemIndex) => {
				contentText += `  ${itemIndex + 1}. ${item.项目}: ${item.说明}\n`;
			});
		}

		return contentText;
	};

	// 初始化可编辑内容
	useEffect(() => {
		if (data.value.length > 0 ) {
			const summary = checkStore.getGeneralSummary() || '';
			editableContent.value = summary ? `${summary}\n\n${generateContent()}` : generateContent();
		}
	}, [data.value]);

	// 复制功能
	const handleCopy = async () => {
		if (copied.value) return;
		try {
			const textToCopy = editableContent.value;
			await copyToClipboard(textToCopy);

			// 显示复制成功反馈
			copied.value = true;

			// 2秒后恢复按钮原始状态并关闭弹窗
			setTimeout(() => {
				copied.value = false;
				checkStore.clearLocalStorage();
				checkStore.initializeData();
				// 关键：clearLocalStorage 的 notify 会把数据通知成空对象，
				// initializeData 重建数据后必须再通知一次，
				// 否则以 dialog 方式打开时（父页面未卸载、订阅仍生效）
				// Check 会停留在空数据上导致渲染异常。
				checkStore.notifyObservers();
				if (onClose) {
					onClose();
				} else {
					history.back();
				}
			}, 2000);
		} catch (error) {
			console.error('复制失败:', error);
			alert('复制失败，请手动选择文本复制');
		}
	};

	// 处理文本内容变化
	const handleContentChange = e => {
		editableContent.value = e.target.value;
	};

	// 检查是否有数据
	const hasData = () => {
		return data.value.length > 0;
	};

	// 如果没有数据，显示提示信息
	if (!hasData()) {
		return (
			<div className={styles.mainContent}>
				<div className={styles.emptyContainer}>
					<h3>暂无数据</h3>
					<p>没有找到要复制的内容</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* 浮动按钮 - 固定在屏幕右上方 */}
			<div className={styles.singleButtonGroup}>
				<button
					onClick={handleCopy}
					className={`${styles.floatingButton} ${styles.copyButton} ${copied.value ? styles.success : ''}`}
					title="复制到剪贴板"
				>
					{copied.value ? '✅' : '📋'}
				</button>
				<button onClick={() => onClose && onClose()} className={styles.floatingButton} title="关闭">
					✕
				</button>
			</div>

			{/* 主要内容 */}
			<div className={styles.mainContent}>
				<div className={styles.container}>
					<h2 className={styles.title}> 复制内容</h2>

					<textarea value={editableContent.value} onInput={handleContentChange} className={styles.editableTextarea} placeholder="在此编辑要复制的内容..." />
				</div>
			</div>
		</div>
	);
}
