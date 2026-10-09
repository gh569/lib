import { signal } from "@preact/signals";
import { obj2Arr } from "./tran-array.js";

const store = {
  tabIndex: signal(0),
  version: "v11.0.0",
  mydata: "",
  // dataPath: 'https://mp-4c96edd9-16e0-488f-8d15-50c0d774125a.cdn.bspapp.com/src/mydata.js',
  dataPath:
    "https://env-00jxhocqgh3m-static.normal.cloudstatic.cn/preact1/use/data/mydata.js",

  // 滑动滑块存储
  swiper: null,
  // 获取共享数据
  getDataByName(tag) {
    return getStore(tag);
  },
};

// 以下是共享的数据说明
// 'simple’表示存储简单的数据
const tags = {
  "tab-hs": ["hs", "simple"], //话术
  "tab-pqlc": ["pqlc", "simple"], //陪签流程
  "tab-pqgz": ["pqgz", "simple"], //陪签工作
  "tab-ts": ["ts"], //提示
  "tab-gy": ["gy"], //工艺
  "tab-jd": ["jd"], //节点
};

/**
 *
 * @param {string} tag  :字符名称
 * @returns
 */
function getStore(tag) {
  const curTag = tags[tag];
  if (!curTag) return null;

  if (curTag.data) return curTag.data;

  const [storeKey, type] = curTag;
  curTag.data = type === "simple" 
    ? obj2Arr(store.mydata[storeKey]) 
    : createComplexData(storeKey); // 分离简单和复杂逻辑

  return curTag.data;
}

// 使用闭包 + 箭头函数完全消除this依赖
function createComplexData(storeKey) {
  const data = {
    thisData: signal([]),
    contentIndex: signal(1),
    current: signal({}),
    init: () => { // 箭头函数确保内部逻辑不依赖this
			if(!store.mydata) store.mydata=JSON.parse(localStorage.mydata)
      data.thisData.value = obj2Arr(store.mydata[storeKey]);
      data.contentIndex.value = 1;
      data.current.value = {};
    }
  };
  data.init(); // 初始化时直接使用闭包中的data引用
  return data;
}

export { store, store as default };
