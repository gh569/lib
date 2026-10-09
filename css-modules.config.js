// css-modules.config.js

  const generateScopedName= (localName, resourcePath, cssContent) => {
    // 标准化路径分隔符，确保在不同操作系统上的一致性
    const normalizedPath = resourcePath.replace(/\\/g, '/');
    
    // 提取文件名（不含扩展名）
    const fileName = normalizedPath.split('/').pop().replace(/\.[^/.]+$/, '');
    
    // 自定义哈希算法 - 确保跨平台一致性
    const generateConsistentHash = (input, length = 5) => {
      let hash = 0;
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        // 转换为32位整数
        hash = hash & hash;
      }
      
      // 转换为base64-like字符串
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      let result = '';
      let value = Math.abs(hash) || 1; // 避免0值
      
      do {
        result = base64Chars[value % 64] + result;
        value = Math.floor(value / 64);
      } while (value > 0);
      
      // 确保长度一致
      if (result.length < length) {
        result = result.padEnd(length, 'A');
      }
      
      return result.substring(0, length);
    };
    
    // 使用标准化的输入生成哈希
    const hashInput = `${normalizedPath}::${localName}`;
    const hash = generateConsistentHash(hashInput, 5);
    
    return `${localName}__${hash}`;
  }

 export { generateScopedName }

