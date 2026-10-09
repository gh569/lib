import store from "@utils/store.js";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const thisTab = "jd";

// 定义一个自定义 Hook
export function useJdData() {
  // 在 Hook 内部使用 useSignal
  const thisData = useSignal([]);
  const current = useSignal({});
  const contentIndex = useSignal(1);
  const selectedData = useSignal([]);
  const isLoading = useSignal(false);
  const error = useSignal(null);

  // 初始化函数
  const init = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await store.getDataByTag(thisTab);
      thisData.value = data;
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    } catch (err) {
      console.error('初始化节点数据失败:', err);
      error.value = err;
      thisData.value = [];
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // 可选：在 Hook 挂载时自动初始化
  useEffect(() => {
    init();
  }, []);

  return {
    thisData,
    current,
    contentIndex,
    selectedData,
    init,
    isLoading,
    error
  };
}