function corsHeaders(origin) {
  const allowed = [
    "http://localhost:5173",
    "https://lib-68k.pages.dev"
  ];

  if (origin && allowed.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true"
    };
  }

  return {};
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    // 处理跨域预检
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin)
      });
    }

    if (url.pathname.startsWith("/api/")) {
      const headers = {
        "Content-Type": "application/json",
        ...corsHeaders(origin)
      };

      return new Response(
        JSON.stringify({ ok: false, time: new Date().toISOString() }),
        { headers }
      );
    }

    return env.ASSETS.fetch(request);
  }
};