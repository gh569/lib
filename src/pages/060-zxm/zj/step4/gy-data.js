import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import store from "@utils/store.js";
import { getDataByStep } from "../helper";

const thisTab = "gy2";
const step = 3;

/**
 * 自定义 Hook：管理 zj-step4 工艺向导页的状态与持久化恢复
 * （持久化写入与 cancelNext 由页面层 useSignalEffect 统一处理）
 */
export function useGyData() {
  const thisData = useSignal([]);
  const current = useSignal({});
  const contentIndex = useSignal(1);
  const selectedData = useSignal([]);
  const { checkedValue, contextValue } = getDataByStep(step);

  async function init() {
    try {
      const data = await store.getDataByTag(thisTab);
      if (contextValue.length > 0) {
        // 恢复已持久化的数据
        thisData.value = contextValue;
        selectedData.value = checkedValue;
      } else {
        // 首次进入：加载数据并过滤空值
        thisData.value = (data || []).filter((item) => item.value != "");
        selectedData.value = [];
      }
      current.value = {};
      contentIndex.value = 1;
    } catch (error) {
      console.error('初始化数据失败:', error);
      thisData.value = [];
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    }
  }

  useEffect(() => {
    if (!thisData.value || thisData.value.length === 0) {
      init();
    }
  }, []);

  return {
    thisData,
    current,
    contentIndex,
    selectedData,
    init
  };
}
