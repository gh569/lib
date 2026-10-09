import { CONSTANTS, INDICES } from "./constants.js";
import {
  calculateSatisfactionScore,
  calculateScore,
  isPY,
  huidanScore,
} from "./calculate.js";

export default function count8wei(values) {
  if (!Array.isArray(values)) {
    throw new Error("输入参数必须是数组");
  }
  const res = [...values];
  const isPYCity = isPY(res);

  // 效率得分
  function xlDF() {
    const a = res[INDICES.HUMAN_EFFICIENCY_SCORE];
    const b = res[INDICES.SERVICE_ABILITY_SCORE];
    const c = res[INDICES.PROFESSIONAL_ABILITY_SCORE];
    const r = a * 0.5 + b * 0.1 + c * 0.4;
    res[INDICES.EFFICIENCY_SCORE] = r.toFixed(2);
  }

  // 人效得分
  function rxDF() {
    const xlcs = isPYCity ? CONSTANTS.XLCS_PY : CONSTANTS.XLCS_NORMAL;
    const cs = res[INDICES.VISIT_TOTAL];
    const yue = res[INDICES.CALCULATION_MONTH];
    let r = (cs / (yue * xlcs)) * 100;
    r = Math.min(r, 100);
    res[INDICES.HUMAN_EFFICIENCY_SCORE] = r.toFixed(2);
  }

  // 服务能力
  function fwnl() {
    const t2 =
      res[INDICES.DISAPPROVED_SERVICE_VISITS] / res[INDICES.VISIT_TOTAL];
    const r = calculateSatisfactionScore(
      t2,
      CONSTANTS.SERVICE.JG,
      CONSTANTS.SERVICE.MAX
    );
    res[INDICES.SERVICE_ABILITY_SCORE] = r.toFixed(2);
  }

  // 日志人工检查
  function rgjc() {
    if (res[INDICES.CHECK_LOG_COUNT] <= 0) {
      return;
    }
    const t =
      res[INDICES.MANUAL_CHECK_LOG_ISSUES] / res[INDICES.CHECK_LOG_COUNT];
    let r;
    if (t <= 0.05) {
      r = 100;
    } else if (t > 0.05 && t <= 0.15) {
      r = 60 + (40 * (0.15 - t)) / 0.1;
    } else if (t > 0.15 && t <= 2) {
      r = (60 * (2 - t)) / (2 - 0.15);
    } else {
      r = 0;
    }
    res[INDICES.MANUAL_CHECK_LOG_SCORE] = r.toFixed(2);
  }

  // 专业能力
  function zynl() {
    if (parseInt(res[INDICES.CHECK_LOG_COUNT]) <= 0) {
      return;
    }
    rgjc();
    res[INDICES.PROFESSIONAL_ABILITY_SCORE] = (
      res[INDICES.MANUAL_CHECK_LOG_SCORE] * 0.6 +
      40
    ).toFixed(2);
  }

  // 质量得分总计
  function zlDF() {
    const t1 =
      res[INDICES.COMPLAINT_SCORE] * 0.5 +
      res[INDICES.SATISFACTION_SCORE] * 0.2 +
      res[INDICES.NPS_SCORE] * 0.3;
    res[INDICES.QUALITY_SCORE] = t1.toFixed(2);
  }

  // nps值
  function npsDF() {
    const a = res[INDICES.NPS_VALUE];
    const { FULL_SCORE, NINETY_SCORE, ZERO_SCORE } = CONSTANTS.NPS;
    let r;
    if (a >= FULL_SCORE) {
      r = 100;
    } else if (a >= NINETY_SCORE) {
      r = ((a - NINETY_SCORE) / 10) * 40 + 60;
    } else if (a >= ZERO_SCORE) {
      r = ((a - ZERO_SCORE) / 40) * 60;
    } else {
      r = 0;
    }
    res[INDICES.NPS_SCORE] = r.toFixed(2);
  }

  // 满意度
  function MYD() {
    const t2 =
      (res[INDICES.NEGATIVE_VISIT_SATISFACTION] +
        res[INDICES.NEGATIVE_MINI_PROGRAM_SATISFACTION]) /
      res[INDICES.VISIT_TOTAL];
    const r = calculateSatisfactionScore(
      t2,
      CONSTANTS.SATISFACTION.JG,
      CONSTANTS.SATISFACTION.MAX
    );
    res[INDICES.SATISFACTION_SCORE] = r.toFixed(2);
  }

  // 投诉得分
  function tsDF() {
    const t2 =
      (res[INDICES.FEEDBACK_COUNT] +
        res[INDICES.COMPLAINT_COUNT] * 2 +
        res[INDICES.MAJOR_COMPLAINT_COUNT] * 4) /
      res[INDICES.VISIT_TOTAL];
    const r = calculateSatisfactionScore(
      t2,
      CONSTANTS.COMPLAINT.JG,
      CONSTANTS.COMPLAINT.MAX
    );
    res[INDICES.COMPLAINT_SCORE] = r.toFixed(2);
  }

  // 效果得分
  function xiaoguoDF() {
    res[INDICES.EFFECT_SCORE] = (
      res[INDICES.RETURN_ORDER_SCORE] * 0.8 +
      res[INDICES.PRAISE_SCORE] * 0.2
    ).toFixed(2);
  }

  // 计算回单得分
  function huidanDF() {
    res[INDICES.RETURN_ORDER_SCORE] = huidanScore(
      res,
      res[INDICES.RETURN_ORDER_CONVERSION]
    );
  }

  // 表扬得分
  function biaoyangDF() {
    const t1 = res[INDICES.POSITIVE_REVIEW_TOTAL] / res[INDICES.VISIT_TOTAL];
    const t2 = calculateScore(
      t1,
      CONSTANTS.PRAISE.PASS_SCORE,
      CONSTANTS.PRAISE.FULL_SCORE
    );
    res[INDICES.PRAISE_SCORE] = t2.toFixed(2);
  }

  // 总分
  function zongfen() {
    const xldf = res[INDICES.EFFICIENCY_SCORE];
    const zldf = res[INDICES.QUALITY_SCORE];
    const xgdf = res[INDICES.EFFECT_SCORE];
    res[INDICES.TOTAL_SCORE] = (xldf * 0.4 + zldf * 0.2 + xgdf * 0.4).toFixed(
      2
    );
    for (let i = INDICES.CALCULATION_MONTH; i < res.length; i++) {
      let k = parseFloat(res[i]?.toString());
      res[i] = isNaN(k) ? 0 : k;
    }
  }
  function main() {
    rxDF();
    fwnl();
    zynl();
    xlDF();
    npsDF();
    MYD();
    tsDF();
    zlDF();
    huidanDF();
    biaoyangDF();
    xiaoguoDF();
    zongfen();

    return res;
  }
  return main();
}
