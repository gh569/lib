
// 定义指标索引对象，使用更具描述性的名称
const INDICES = {
  NEW_VALUE: 'newValue',
  OLD_VALUE: 'oldValue',
  CITY: 0,					            //城市
  NAME: 1,					            //监理姓名
  YEAR: 2,					            //计算年份
  START_DATE: 3,					      //计算开始日期
  CALCULATION_MONTH: 4,					//当年计算月份
  TOTAL_SCORE: 5,								//总分
  EFFICIENCY_SCORE: 6,					//效率得分
  QUALITY_SCORE: 7,							//质量得分
  EFFECT_SCORE: 8,							//效果得分
  HUMAN_EFFICIENCY_SCORE: 9,		//人效得分
  SERVICE_ABILITY_SCORE: 10,		//服务能力得分
  PROFESSIONAL_ABILITY_SCORE: 11,		//专业能力得分
  COMPLAINT_SCORE: 12,					//投诉得分
  SATISFACTION_SCORE: 13,				//满意度得分
  NPS_SCORE: 14,								//NPS得分
  PRAISE_SCORE: 15,							//表扬得分
  RETURN_ORDER_SCORE: 16,				//回单得分
  VISIT_TOTAL: 17,							//上门总数
  DISAPPROVED_SERVICE_VISITS: 18,		//回访服务类不认可数量
  MANUAL_CHECK_LOG_ISSUES: 19,	//人工检查日志有问题数
  MANUAL_CHECK_LOG_SCORE: 20,		//人工检查日志得分
  FEEDBACK_COUNT: 21,						//反馈数量
  COMPLAINT_COUNT: 22,					//投诉数量
  MAJOR_COMPLAINT_COUNT: 23,		//重大投诉数量
  NEGATIVE_MINI_PROGRAM_SATISFACTION: 24, 	//小程序满意度负面数量
  NEGATIVE_VISIT_SATISFACTION: 25,					//回访满意度负面数量
  NPS_VALUE: 26,								//NPS值
  POSITIVE_REVIEW_TOTAL: 27,		//好评总数
  RETURN_ORDER_TOTAL: 28,				//回单总数
  RETURN_ORDER_CONVERSION: 29,	//回单换算后的数量
  CHECK_LOG_COUNT: 30,					//检查日志篇数
};


// 定义常量对象，使用更具描述性的名称
const CONSTANTS = {
  // 回单相关
  RETURN_ORDER: {
    PY_PASS_SCORE: 0.039,
    PY_FULL_SCORE: 0.075,
    NON_PY_PASS_SCORE: 0.027,
    NON_PY_FULL_SCORE: 0.06
  },
  // 表扬相关
  PRAISE: {
    PASS_SCORE: 0.0191,
    FULL_SCORE: 0.05
  },
  // NPS 相关
  NPS: {
    FULL_SCORE: 100,
    NINETY_SCORE: 90,
    ZERO_SCORE: 50
  },
  // 其他配置
  SERVICE: {
    JG: 0.0023,
    MAX: 0.05
  },
  SATISFACTION: {
    JG: 0.0043,
    MAX: 0.05
  },
  COMPLAINT: {
    JG: 0.0025,
    MAX: 0.05
  },
  PY_CITIES: ['深圳', '广州', '武汉'],
  KC_CITIES: ['重庆', '长沙','成都'],
  XLCS_NORMAL: 100,
  XLCS_PY: 150
};


  
export { CONSTANTS, INDICES };
