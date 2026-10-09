import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import store from "@utils/store.js";

/**
 * 自定义 Hook：管理工艺（gy / gy2）页面的状态和初始化逻辑
 * @param {string} tab 数据标签，如 "gy" / "gy2"
 * @param {object} [opts]
 * @param {boolean} [opts.filterEmpty] 是否过滤 value 为空的项（gy2 使用）
 */
export function useGyData(tab = "gy", { filterEmpty } = {}) {
  // 1. 在组件内部使用 useSignal 创建状态
  const thisData = useSignal([]);
  const current = useSignal({});
  const contentIndex = useSignal(1);
  const selectedData = useSignal([]);

  // 2. 定义初始化函数
  async function init() {
    try {
      const data = await store.getDataByTag(tab);
      const clean = filterEmpty ? (data || []).filter((item) => item.value != "") : data || [];
      thisData.value = clean;
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    } catch (error) {
      console.error('初始化数据失败:', error);
      thisData.value = [];
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    }
  }

  // 3. 自动初始化
  useEffect(() => {
    if (!thisData.value || thisData.value.length === 0) {
      init();
    }
  }, []);

  // 4. 返回状态和方法
  return {
    thisData,
    current,
    contentIndex,
    selectedData,
    init
  };
}
