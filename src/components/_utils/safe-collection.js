const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 创建安全的数据库集合对象（非Proxy实现）
 * @param {String} collectionName 集合名称
 * @returns {Object} 包含安全 where 和原生方法的对象
 */
export const safeCollection = (collectionName) => {
  const collection = db.collection(collectionName);
  
  // 1. 创建一个新对象，用于存放我们自定义的逻辑
  const safeObj = {
    // 自定义 where 方法：自动注入软删除条件
    where(query = {}) {
      // 使用 $and 合并条件，防止业务条件覆盖软删除条件
      const safeQuery = {
        $and: [
          { isDeleted: dbCmd.neq(true) }, // 强制的软删除条件
          query                           // 业务传入的查询条件
        ]
      };
      
      // 调用原生 where 后，返回原生查询构建器
      // （注意：如果后续还需要继续安全过滤，这里可以返回新的 safeObj，但通常 where 之后就是 get/update）
      return collection.where(safeQuery);
    }
  };

  // 2. 将原生集合对象上的其他方法（如 add, doc, orderBy, limit 等）直接透传
  for (const key in collection) {
    if (typeof collection[key] === 'function' && !safeObj[key]) {
      safeObj[key] = collection[key].bind(collection);
    }
  }

  return safeObj;
};