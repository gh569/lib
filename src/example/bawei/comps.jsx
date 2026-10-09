// 由于 CONSTANTS 未被使用，移除该导入
import { INDICES } from "./constants.js";
import style from "./bawei.module.css";
import count8wei from "./compute.js";

const arrs = [
  { name: "回单：", value: INDICES.RETURN_ORDER_CONVERSION },
  { name: "好评：", value: INDICES.POSITIVE_REVIEW_TOTAL },
  { name: "次数：", value: INDICES.VISIT_TOTAL },
  { name: "反馈：", value: INDICES.FEEDBACK_COUNT },
  // { name: "日志", value: INDICES.CHECK_LOG_COUNT },
];

// 提取输入项渲染逻辑到单独函数，提高可读性
function renderInputItem(item, values) {
	const onInput = (index, e) => {
	  // 使用 Number 进行转换，同时处理空字符串
		
	  const v = Number(e.target.value) || 0;
	  values.value[index] = v;
	  // 调用 count8wei 更新值
	  values.value = count8wei(values.value);
	};
  return (
    <div className={style.rightItem}>
      <div className={style.rightItemTitle}>{item.name}</div>
      <input
        type="number" // 使用 number 类型限制输入
        inputMode="numeric" // 移动端显示数字键盘
        className={style.rightItemInput}
        value={
          Number.isFinite(values.value[item.value])
            ? values.value[item.value]
            : 0
        }
        onInput={(e) => onInput(item.value, e)}
        min="0" // 限制最小值为 0
      />
    </div>
  );
}

function comps(values) {
  return (
    <div>{arrs.map((item) => renderInputItem(item, values))}</div>
  );
}

export default comps;
