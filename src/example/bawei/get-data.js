import { CONSTANTS, INDICES } from "./constants.js";
import { huidanScore } from "./calculate.js";
import count8wei from "./compute.js";

// 辅助函数：将值转换为数字，如果不是数字则返回原值
const convertToNumber = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? value : num;
};

/**
 * 获取所有数据
 * @param {Array} data - 输入的数组数据
 * @returns {Object} - 包含 values、titles 和 names 的对象
 */
function getAllData(data) {
  if (!Array.isArray(data)) {
    throw new Error("输入参数必须是数组");
  }
  const titles = Object.keys(data[0]);
  const names = data.map((item) => item[titles[INDICES.NAME]]);
  const values = data.map((item) => Object.values(item).map(convertToNumber));
  titles[INDICES.RETURN_ORDER_CONVERSION] = "回单换算";
  titles[INDICES.CHECK_LOG_COUNT] = "检查日志篇数";
  return { values, titles, names };
}

/**
 * 获取回单转化率
 * @param {Array} values - 包含相关数据的数组
 * @returns {number} - 计算得到的回单数量，若未找到则返回 -1
 */
function getHdConversion(values) {
  const returnOrderTotal = parseInt(values[INDICES.RETURN_ORDER_TOTAL], 10);
  const oldHdScore = Number(values[INDICES.RETURN_ORDER_SCORE]);

  let bestCount = -1;
  let minDiff = Infinity;

  for (let i = returnOrderTotal * 2; i <= returnOrderTotal * 10; i++) {
    const score = Number(huidanScore(values, i / 2));
    const diff = Math.abs(score - oldHdScore);

    if (diff < minDiff) {
      minDiff = diff;
      bestCount = i / 2;
    }
  }

  return bestCount;
}

// 提取更新数据的公共逻辑
function updateData(values, curIndex, newValue, oldValue) {
  oldValue.value = values.value[curIndex.value] ?? [];
  oldValue.value[INDICES.RETURN_ORDER_CONVERSION] =
    getHdConversion(oldValue.value) ?? 0;
  oldValue.value[INDICES.CHECK_LOG_COUNT] = 0;
  newValue.value = count8wei(oldValue.value);
}

export { getAllData, updateData, getHdConversion };
