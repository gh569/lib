import { isHashRoute } from "./router-mode.js";

/**
 * 解析目标路径为绝对路径（支持相对/绝对路径）。
 * @param {string} path - 目标路径（相对或绝对路径）
 * @param {number} [level=0] - 绝对路径的替换层级：1 取最后一级为基址，2 取倒数第二级，以此类推
 * @returns {string} 解析后的绝对路径
 */
export function resolveAbsolutePath(path, level = 0) {
  // 按声明的路由模式取当前路径（hash 取 # 后、history 取 pathname），并去掉 query
  const raw = isHashRoute()
    ? window.location.hash.replace(/^#/, '')
    : window.location.pathname;
  const currentPath = raw.split('?')[0] || '/';

  // 绝对路径：level<=0 直接返回；否则保留当前路径前 (总层数 - level) 层作基址拼接
  if (path.startsWith('/')) {
    if (!level || level <= 0) return path;
    const segments = currentPath.split('/').filter(Boolean);
    const keepLength = level >= segments.length ? segments.length : segments.length - level;
    return '/' + segments.slice(0, keepLength).join('/') + path;
  }

  // 相对路径：以当前路径为目录，交给 URL 解析器处理 ./ 与 ../
  const currentDir = currentPath.endsWith('/') ? currentPath : currentPath + '/';
  return new URL(path, window.location.origin + currentDir).pathname;
}
