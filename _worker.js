export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 处理 API 路由（比如 /api/hello）
    if (url.pathname === '/api/hello') {
      const data = { message: 'Hello from Cloudflare Pages Worker!', time: new Date().toISOString() };
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. 处理静态前端页面（必须保留，否则前端打不开）
    // 注意：如果你的前端打包在 /public 目录，Cloudflare 会自动托管。
    // 这里的 fetch 会把剩下的请求交给 Pages 的静态资源处理。
    return env.ASSETS.fetch(request);
  }
};