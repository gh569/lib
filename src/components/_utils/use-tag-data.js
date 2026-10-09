import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import store from "@utils/store.js";

/**
 * 通用取数 Hook：按 tag 从 store 拉取数据并挂在信号上（挂载时自动拉取）。
 * @param {string} tag 数据标签，如 "hs" / "pqgz" / "pqlc" / "images" / "ts"
 * @param {object} [opts]
 * @param {(raw:Array)=>Array} [opts.transform] 拉取后对原始数据的转换，缺省原样返回
 * @returns {import("@preact/signals").Signal} 数据信号（页面读取 .value，可直接赋值触发视图更新）
 */
export function useTagData(tag, { transform } = {}) {
  const data = useSignal([]);

  useEffect(() => {
    let cancelled = false;
    store
      .getDataByTag(tag)
      .then((raw) => {
        if (cancelled) return;
        data.value = transform ? transform(raw) : raw;
      })
      .catch((error) => {
        if (!cancelled) console.error("获取数据失败:", error);
      });
    return () => {
      cancelled = true;
    };
  }, [tag]);

  return data;
}
