// src/components/_supabase/reset-password/index.js
// 密码重置集中模块：状态、消费、渲染组件统一从这里导出。
// 抢收逻辑在 capture.js（须由 main.js 第一个 import 执行副作用，故不在此导出）。
export { recoveryPending, consumeRecovery } from "./store";
export { default as ResetPasswordPage } from "./reset-password-page";
