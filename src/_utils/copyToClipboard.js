import showToast from "./toast";

async function copyToClipboard(content) {
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
    
    showToast('复制成功');
    return true;
  } catch (error) {
    console.error('复制失败:', error);
    showToast('复制失败，请手动复制');
    return false;
  }
}

export { showToast, copyToClipboard, copyToClipboard as copy, copyToClipboard as default };