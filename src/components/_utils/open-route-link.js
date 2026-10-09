import { isHashRoute } from "./router-mode.js";

/** 归一化查询参数：支持 "?a=1"、不带 ? 的字符串或键值对象，统一为 "?a=1&b=2" 形式 */
function normalizeQuery(query) {
  if (!query) return "";
  if (typeof query === "string") {
    return query.startsWith("?") ? query : `?${query}`;
  }
  if (typeof query === "object") {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => params.set(key, value));
    return `?${params.toString()}`;
  }
  return "";
}

/**
 * 构造同源路由 URL（兼容 hash / history）。
 * @param {string} path 路由路径
 * @param {string|object} [query=""] 查询参数，支持 "?a=1"、字符串或键值对象
 * @param {object} [options]
 * @param {boolean} [options.withOrigin=false] 是否拼上 window.location.origin
 * @returns {string}
 */
function buildRouteUrl(path, query = "", options = {}) {
  const { withOrigin = false } = options || {};
  const qs = normalizeQuery(query);
  const pathOnly = (path || "").split("?")[0]; // 路径剥离 ? 段，避免 search 混入 hash
  if (isHashRoute()) {
    // wouter hash 约定：search 在前、路径在后 → "...?query#/path"，
    // 如此 useSearch 能读到 search，useHashLocation 匹配的 hash 才是纯路径
    const hashUrl = `${qs}#${pathOnly}`;
    return withOrigin ? `${window.location.origin}${hashUrl}` : hashUrl;
  }
  const historyUrl = `${path}${qs}`; // history：search 跟在 path 后
  return withOrigin ? `${window.location.origin}${historyUrl}` : historyUrl;
}

/**
 * 打开同源路由页面：hash 路由新标签页 window.open；history 路由当前页 pushState 跳转。
 * @param {string} path 路由路径
 * @param {string|object} [query=""] 查询参数，支持 "?a=1"、字符串或键值对象
 * @param {object} [options]
 * @param {boolean} [options.withOrigin=false] 是否拼上 window.location.origin
 * @param {string} [options.target="_blank"] 打开目标
 * @returns {Window|null|void}
 */
export function openRouteLink(path, query = "", options = {}) {
  const { target = "_blank", withOrigin = false } = options || {};
  if (isHashRoute()) {
    // hash 路由：新标签页 window.open（hash 子路径不请求服务器，不会 404）
    return window.open(buildRouteUrl(path, query, { withOrigin }), target);
  }
  // history 路由：当前页 pushState 跳转（SPA 内跳转，不刷新页面，云托管不会 404）
  const targetPath = (path || "").split("?")[0] + normalizeQuery(query);
  history.pushState({}, "", targetPath);
  return null;
}
