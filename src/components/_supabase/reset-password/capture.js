// src/components/_supabase/reset-password/capture.js
// 页面最早执行的抢收逻辑：在 uni-app 框架处理 location.hash 之前，
// 把 supabase 找回密码令牌从 URL 取走存入 sessionStorage，并把 hash 还原成干净路由，
// 否则 uni-app 的 hash 路由会把 "#access_token=..." 当路由拦截掉。
// ⚠️ 必须保持为 src/main.js 的第一个 import（先于 vue / app.vue 拉起的 uni 框架执行）。
(function () {
	try {
		var h = window.location.hash || '';
		var params = new URLSearchParams(h.charAt(0) === '#' ? h.slice(1) : h);
		if (params.get('type') === 'recovery' && params.get('access_token')) {
			sessionStorage.setItem('supabase_recovery', JSON.stringify({
				access_token: params.get('access_token'),
				refresh_token: params.get('refresh_token') || '',
				expires_in: params.get('expires_in') || ''
			}));
			// 方案A：不再跳转 reset-password 路由（应用启动后按 recoveryPending 直接渲染改密页），
			// 只需清掉 URL 中的 token hash，避免被路由拦截
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	} catch (e) {}
})();
