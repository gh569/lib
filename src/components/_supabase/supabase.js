import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey,{
  auth: {
    autoRefreshToken: true,
    persistSession: true, // 关键：存在localStorage，关浏览器不会丢会话
    detectSessionInUrl: false // 令牌改由 index.html 内联脚本预收 + recovery.js 手动 setSession，避免与 uni-app hash 路由冲突
  }
});
