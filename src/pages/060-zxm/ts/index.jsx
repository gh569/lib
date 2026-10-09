import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Ts from "./ts";
import store from "@utils/store.js";

const thisTab = "ts";

function Page() {
  // 1. 使用 useSignal 初始化状态
  const thisData = useSignal([]);
  const current = useSignal({});
  const contentIndex = useSignal(1);
  const selectedData = useSignal([]);

  // 2. 定义初始化函数 (不使用 useCallback)
  async function init() {
    try {
      const data = await store.getDataByTag(thisTab);
      
      // 更新信号值
      thisData.value = data || [];
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    } catch (err) {
      console.error('初始化提示数据失败:', err);
      // 出错时重置为默认空状态
      thisData.value = [];
      current.value = {};
      contentIndex.value = 1;
      selectedData.value = [];
    }
  }

  useEffect(() => {
    // 3. 挂载时检查并初始化
    if (!thisData.value || thisData.value.length === 0) {
      init();
    }
  }, []); // 依赖项为空，仅在挂载时执行一次

  return (
    <Ts 
      thisData={thisData} 
      current={current} 
      contentIndex={contentIndex} 
      selectedData={selectedData}
      // 4. 传递 init 函数给 Ts，以便子组件可以触发重新加载
      init={init}
    />
  );
}

export default Page;