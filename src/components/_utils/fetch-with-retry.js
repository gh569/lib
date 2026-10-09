// @utils/urlFetcher.js
const MAX_COUNT = 3;
const TIMEOUT_DURATION = 5000;

/**
 * 获取URL数据，支持重试机制（纯Promise风格）
 * @param {Function} apiCall - API调用函数
 * @param {Array} params - API调用参数
 * @returns {Promise<any>} 返回解析后的 result 数据
 */
export const fetchWithRetry = async (apiCall, params) => {
    let count = 0;

    while (count < MAX_COUNT) {
        try {
            // 1. 超时控制
            let timeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => reject(new Error('请求超时')), TIMEOUT_DURATION);
            });

            const response = await Promise.race([
                apiCall(...params),
                timeoutPromise
            ]);
            
            // 2. 清理定时器
            clearTimeout(timeoutId);

            // 3. 数据校验与解析
            if (!response) throw new Error('返回数据为空');

            const parsedResponse = typeof response === 'string' 
                ? JSON.parse(response) 
                : response;

            if (!parsedResponse?.data?.result) {
                throw new Error('数据结构不正确');
            }

            // 4. 成功直接返回数据
            return parsedResponse.data.result;

        } catch (error) {
            console.error(`请求失败 (尝试 ${count + 1}/${MAX_COUNT}):`, error.message);
            
            // 5. 判断是否还能重试
            if (count < MAX_COUNT - 1) {
                const retryDelay = Math.pow(2, count) * 1000;
                console.log(`${retryDelay}ms后重试...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            } else {
                // 6. 重试耗尽，抛出最终错误（包含原始错误信息）
                throw new Error(`达到最大重试次数，请求失败: ${error.message}`);
            }
        }
        count++;
    }
};

/*
  调用方示例：
  import { fetchWithRetry } from '@/@utils/urlFetcher';

  const loadData = async () => {
      try {
          const result = await fetchWithRetry(apiFunc, [param1, param2]);
          console.log('成功获取数据:', result);
          // 处理成功逻辑...
      } catch (error) {
          console.error('最终失败:', error);
          // 处理失败逻辑...
      }
  }
*/
