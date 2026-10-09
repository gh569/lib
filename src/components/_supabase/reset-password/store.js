// src/components/_supabase/reset-password/store.js
// 密码重置的状态与消费：recoveryPending 信号 + consumeRecovery。
// 令牌由 capture.js 抢收存入 sessionStorage，应用启动时 consumeRecovery 消费并标记重置状态。
import { signal } from '@preact/signals'
import { supabase } from '@supa/supabase'

// 标记当前是否处于"找回密码重置"流程
export const recoveryPending = signal(false)

// 应用启动时调用：从 sessionStorage 取令牌 → 手动 setSession → 标记 recovery
export async function consumeRecovery() {
  let payload = null
  try {
    payload = JSON.parse(sessionStorage.getItem('supabase_recovery') || 'null')
  } catch (e) {
    payload = null
  }
  if (!payload || !payload.access_token) return false

  const { error } = await supabase.auth.setSession({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  })
  if (error) {
    console.error('[recovery] setSession failed:', error)
    return false
  }

  recoveryPending.value = true
  try {
    sessionStorage.removeItem('supabase_recovery')
  } catch (e) {}
  return true
}
