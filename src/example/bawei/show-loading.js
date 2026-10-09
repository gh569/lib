// 简洁版本的加载提示函数
function showLoading(message = '加载中...') {
  // 如果已存在，先移除
  hideLoading();
  
  // 创建加载元素
  const loadingEl = document.createElement('div');
  loadingEl.id = 'simple-loading';
  loadingEl.innerHTML = `
    <style>
      #simple-loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }
      .loading-content {
        background: white;
        padding: 25px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        min-width: 220px;
      }
      .spinner {
        width: 45px;
        height: 45px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      .loading-text {
        font-size: 15px;
        color: #333;
        margin: 0;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <div class="loading-content">
      <div class="spinner"></div>
      <p class="loading-text">${message}</p>
    </div>
  `;
  
  document.body.appendChild(loadingEl);
}

function hideLoading() {
  const loadingEl = document.getElementById('simple-loading');
  if (loadingEl) {
    loadingEl.remove();
  }
}

export { showLoading, hideLoading };