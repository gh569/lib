// src/components/_supabase/reset-password/reset-password-page.jsx
// 找回密码重置页（集中模块，不再作为路由页面）。
// 不依赖 onAuthStateChange 的 PASSWORD_RECOVERY 事件（手动 setSession 不触发该事件），
// 而是读 recoveryPending 信号判断是否展示表单。
import { supabase } from "@supa/supabase";
import { useSignal } from "@preact/signals";
import { recoveryPending } from "./store";
import styles from "./reset-password.module.css";

export default function ResetPasswordPage() {
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const error = useSignal("");
  const done = useSignal(false);

  // 只在确认来自"找回密码邮件令牌"的流程中开放改密码表单，
  // 不允许普通登录会话进入（否则任何已登录用户都能绕过邮件验证改密码）。
  // consumeRecovery 已在 render 前 await 完成，渲染时 recoveryPending 是最终值。
  const inRecovery = recoveryPending.value;

  async function updatePassword() {
    error.value = "";
    if (!password.value) {
      error.value = "请输入新密码";
      return;
    }
    if (password.value.length < 6) {
      error.value = "密码长度至少6位";
      return;
    }
    if (password.value !== confirmPassword.value) {
      error.value = "两次输入的密码不一致";
      return;
    }

    try {
      const { error: apiError } = await supabase.auth.updateUser({
        password: password.value,
      });
      if (apiError) {
        error.value = apiError.message || "密码修改失败";
      } else {
        done.value = true;
        recoveryPending.value = false;
      }
    } catch (e) {
      error.value = "网络错误，请稍后重试";
    }
  }

  return (
    <div className={styles["page-container"]}>
      <div className={styles["card"]}>
        <div className={styles["card-header"]}>
          <h2 className={styles["card-title"]}>密码重置</h2>
        </div>
        <div className={styles["card-body"]}>
          {done.value ? (
            /* 修改成功 */
            <div className={styles["status-container"] + " " + styles["status-container-success"]}>
              <div className={styles["status-icon"] + " " + styles["status-icon-success"]}>✓</div>
              <h3 className={styles["status-title"]}>密码修改成功</h3>
              <p className={styles["status-text"]}>您的密码已成功更新，请返回首页并重新登录。</p>
            </div>
          ) : !inRecovery ? (
            /* 未进入找回流程 */
            <div className={styles["status-container"] + " " + styles["status-container-info"]}>
              <div className={styles["status-icon"] + " " + styles["status-icon-info"]}>!</div>
              <h3 className={styles["status-title"]}>请从邮箱链接进入</h3>
              <p className={styles["status-text"]}>请打开您收到的密码重置邮件，点击其中的链接进行修改。</p>
            </div>
          ) : (
            /* 重置表单 */
            <div className={styles["password-reset-container"]}>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>新密码</label>
                <input
                  type="password"
                  placeholder="请输入新密码（至少6位）"
                  value={password.value}
                  onInput={(e) => (password.value = e.target.value)}
                  className={styles["form-input"]}
                />
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>确认密码</label>
                <input
                  type="password"
                  placeholder="请再次输入新密码"
                  value={confirmPassword.value}
                  onInput={(e) => (confirmPassword.value = e.target.value)}
                  className={styles["form-input"]}
                />
              </div>

              {error.value && <div className={styles["error-message"]}>{error.value}</div>}

              <button onClick={updatePassword} className={styles["submit-button"]}>
                修改密码
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
