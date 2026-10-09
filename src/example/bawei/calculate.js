import { CONSTANTS, INDICES } from "./constants.js";

// 提取重复的分数计算逻辑
function calculateScore(value, passScore, fullScore) {
  if (value >= fullScore) {
    return 100;
  } else if (value >= passScore) {
    return ((value - passScore) / (fullScore - passScore)) * 40 + 60;
  } else {
    return (value / passScore) * 60;
  }
}

// 提取重复的满意度计算逻辑
function calculateSatisfactionScore(value, jg, max) {
  if (value >= max) {
    return 0;
  } else if (value >= jg) {
    return ((max - value) / (max - jg)) * 60;
  } else {
    return ((jg - value) / jg) * 40 + 60;
  }
}

function isPY(values) {
  const city = values[INDICES.CITY];
  return CONSTANTS.PY_CITIES.includes(city);
}

/**
 * 计算回单得分
 * @param {Array} res - 包含相关数据的数组
 * @param {number} hdCount - 回单数量
 * @returns {string} - 格式化后的回单得分
 */
function huidanScore(res, hdCount) {
  const t1 = hdCount / res[INDICES.VISIT_TOTAL];
  const { PY_PASS_SCORE, PY_FULL_SCORE, NON_PY_PASS_SCORE, NON_PY_FULL_SCORE } = CONSTANTS.RETURN_ORDER;
  const isPYCity = isPY(res);
  const h_jg = isPYCity ? PY_PASS_SCORE : NON_PY_PASS_SCORE;
  const h_100 = isPYCity ? PY_FULL_SCORE : NON_PY_FULL_SCORE;
  const t2 = calculateScore(t1, h_jg, h_100);
  return t2.toFixed(0);
}

export { calculateScore, calculateSatisfactionScore, isPY,huidanScore };
