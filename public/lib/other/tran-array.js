/**
 * obj2Arr  将对象转换为包含特定结构对象的数组
 * @param {Object} obj - 需转换的对象
 * @returns {Array|null} - 转换后的数组，若输入不是对象则返回 null
 */
function obj2Arr(obj) {
  // 若输入不是对象或为 null，直接返回 null
  if (typeof obj !== 'object' || obj === null) return null;

  // 存储最终结果的数组
  const result = [];
  // 用于记录元素索引
  let index = 0;

  // 递归处理对象的函数
  function traverse(currentObj, currentGrade) {
    let counter = 1;
    for (const key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        const newGrade = [...currentGrade, counter];
        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          // 处理对象类型的属性
          addToArray(key, newGrade);
          traverse(currentObj[key], newGrade);
        } else if (isNaN(parseInt(key))) {
          // 处理非数字键的属性
          addToArray(key, newGrade);
          addToArray(currentObj[key], [...newGrade, 1]);
        } else {
          // 处理数字键的属性
          addToArray(currentObj[key], newGrade);
        }
        counter++;
      }
    }
  }

  // 将元素添加到结果数组的函数
  function addToArray(value, grade) {
    result.push({
      grade,
      index: index++,
      value
    });
  }

  // 开始递归处理
  traverse(obj, []);

  return result;
}

export { obj2Arr as default, obj2Arr };