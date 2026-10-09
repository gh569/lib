// src/components/_supabase/auth.js
import { signal } from '@preact/signals'
import { supabase } from '@supa/supabase'

// 使用 signal 管理全局认证状态
export const authStateSignal = signal({
  user: null,
  session: null,
  loading: true
})

// 获取当前认证状态的工具函数
export const useAuth = () => {
  // 返回信号的值
  return authStateSignal.value
}

// 认证相关的工具函数
export const authUtils = {
  // 登出函数
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('退出登录失败:', error.message)
      return { error: error.message }
    }
    
    // 更新信号状态
    authStateSignal.value = {
      user: null,
      session: null,
      loading: false
    }
    
    return { success: true }
  },
  
  // 登录函数
  signIn: async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('登录失败:', error.message)
      return { error: error.message, data: null }
    }
    
    // 更新信号状态
    authStateSignal.value = {
      user: data.user,
      session: data.session,
      loading: false
    }
    
    return { success: true, data }
  },
  
  // 获取当前用户
  getCurrentUser: () => {
    return authStateSignal.value.user || null
  },
  
  // 检查是否已登录
  isAuthenticated: () => {
    return !!authStateSignal.value.user
  },
  
  // 获取当前会话
  getCurrentSession: () => {
    return authStateSignal.value.session || null
  },
  
  // 初始化认证状态
  initializeAuth: async () => {
    // 检查当前会话
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('获取会话失败:', error.message)
      authStateSignal.value = {
        user: null,
        session: null,
        loading: false
      }
    } else {
      authStateSignal.value = {
        user: session?.user || null,
        session: session || null,
        loading: false
      }
    }
    
    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          authStateSignal.value = {
            user: null,
            session: null,
            loading: false
          }
        } else if (session) {
          authStateSignal.value = {
            user: session.user,
            session: session,
            loading: false
          }
        } else {
          authStateSignal.value = {
            user: null,
            session: null,
            loading: false
          }
        }
      }
    )
    
    return subscription
  }
}

// 初始化认证状态
authUtils.initializeAuth()