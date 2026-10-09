
async function _copy(content) {
	try {
		// 优先使用现代Clipboard API
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(content);
		} else {
			// 兼容旧版浏览器
			const textarea = document.createElement('textarea');
			textarea.value = content;
			textarea.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        opacity: 0;
      `;
			document.body.appendChild(textarea);
			textarea.select();

			if (!document.execCommand('copy')) {
				throw new Error('Clipboard copy failed');
			}
			document.body.removeChild(textarea);
		}

		return true;
	} catch (error) {
		console.error('复制失败:', error);
		return false;
	}
}

function copyToClipboard(text) {
	if (typeof uni !== 'undefined') {
		uni.setClipboardData({
			data: text,
			success: () => {uni.showToast({
				title:'复制成功'
			})},
			fail: (error) => console.error('复制失败:', error)
		});
	} else {
		_copy(text);
	}
}


export {
	copyToClipboard,
	copyToClipboard as copy,
	copyToClipboard as
	default
};