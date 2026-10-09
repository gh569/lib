import store from "@utils/store.js";

/**
 * 替换话术/流程文本中的占位符：
 *  - myname / mytel / mymail / mycity → store 中对应的真实值（按调用时读取，保证拿到最新值）
 *  - 制表符 \t → 两个空格
 * @param {string} text 待替换文本
 * @returns {string}
 */
export function replacePlaceholders(text) {
  return String(text)
    .replace(/myname|mytel|mymail|mycity/g, (match) => store[match] || "")
    .replace(/\t/g, "  ");
}
