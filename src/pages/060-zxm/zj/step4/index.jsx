import Gy from "../../gy/gy";
import { useGyData } from "./gy-data";
import { setDataByStep } from "../helper";
import { useSignalEffect } from "@preact/signals";

const step = 3;

function Page({ cancelNext }) {
  const { thisData, current, contentIndex, selectedData, init } = useGyData();

  // 向导模式：选择变化时持久化 + 控制下一步（与 step1/step2 同款声明式写法）
  useSignalEffect(() => {
    setDataByStep(step, { checkedValue: selectedData.value, contextValue: thisData.value });
    if (cancelNext) cancelNext.value = !(selectedData.value.length > 0);
  });

  return (
    <Gy
      thisData={thisData}
      current={current}
      contentIndex={contentIndex}
      selectedData={selectedData}
      init={init}
      showCopy={false}
    />
  );
}

export default Page;
