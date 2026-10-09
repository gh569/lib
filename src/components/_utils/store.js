import { obj2Arr } from "@utils/tran-array.js";
import { loadScript } from '@utils/load-script';

// 话术，陪签流程，陪签工作，提示，工艺，节点
const TAGS = ["hs", "pqlc", "pqgz", "ts", "gy", "jd","images","gy2"];
const DATA_PATH = `${import.meta.env.VITE_DATA_URL}/mydata.js`;
console.log(DATA_PATH)

let myHsData = null;
let loadingPromise = null;

class Store {
  constructor() {
    this.version = import.meta.env.VITE_VERSION;
    this.isLocalRestoreFailed = false; // 标记本地数据是否恢复失败
    this.#init();
  }

  /**
   * 根据标签获取数据
   * @param {string} tag - 数据标签
   * @returns {Array} 转换后的数组数据
   */
  async getDataByTag(tag) {
    if (!TAGS.includes(tag)) return [];

    if (!myHsData) {
      this.#restoreFromLocal();

      if (!myHsData) {
        await this.#preloadData();
      }
    }

    return myHsData?.[tag] ? obj2Arr(myHsData[tag]) : [];
  }

  /**
   * 刷新数据（强制从网络加载最新数据）
   * @public
   */
  async refreshData() {
    loadingPromise = null; // 清除之前的加载状态
    await this.#preloadData();
  }

  /**
   * 从本地存储恢复数据
   * @private
   */
  #restoreFromLocal() {
    if (localStorage.mydata && /version/i.test(localStorage.mydata)) {
      try {
        myHsData = JSON.parse(localStorage.mydata);
        this.mytel = this.#getValueFromStorageOrData("mytel", "mytel");
        this.myname = this.#getValueFromStorageOrData("myname", "myname");
        this.mycity = this.#getValueFromStorageOrData("mycity", "mycity");
        this.mymail = this.#getValueFromStorageOrData("mymail", "mymail");
        console.log("已从本地存储恢复数据");
        this.isLocalRestoreFailed = false; // 恢复成功，重置标志位
      } catch (error) {
        console.error("解析 localStorage 数据时出错:", error);
        this.isLocalRestoreFailed = true; // 标记本地数据恢复失败
      }
    } else {
      this.isLocalRestoreFailed = true; // 无本地数据，标记失败
    }
  }

  /**
   * 预加载数据模块（网络加载）
   * @private
   */
  #preloadData() {
    if (!loadingPromise) {
      const path = `${DATA_PATH}?${new Date().getTime()}`;
      loadingPromise = loadScript(path)
        .then((module) => {
          myHsData = module;
          // 更新本地存储
          this.#updateLocalData(module);
          console.log("网络数据加载完成");

          // 如果本地数据恢复失败，则重新尝试恢复
          if (this.isLocalRestoreFailed) {
            this.#restoreFromLocal();
          }

          return module;
        })
        .catch((err) => {
          console.error("网络数据加载失败:", err);
          loadingPromise = null;
          throw err;
        });
    }

    return loadingPromise;
  }

  /**
   * 更新本地存储数据
   * @private
   * @param {Object} data - 要存储的数据
   */
  #updateLocalData(data) {
    try {
      localStorage.mydata = JSON.stringify(data);
      console.log("本地数据已更新");
    } catch (error) {
      console.error("更新本地存储失败:", error);
    }
  }

  /**
   * 从本地存储或数据中获取值
   * @private
   * @param {string} storageKey - 存储键名
   * @param {string} dataKey - 数据键名
   * @returns {*} 对应的值
   */
  #getValueFromStorageOrData(storageKey, dataKey) {
    return localStorage[storageKey] || myHsData?.[dataKey];
  }

  /**
   * 初始化方法
   * @private
   */
  async #init() {
    try {
      // 优先从本地恢复数据
      this.#restoreFromLocal();

      // 启动网络数据加载（不阻塞初始化）
      this.#preloadData()
        .then(() => {
          console.log("数据初始化完成，已更新为最新版本");
        })
        .catch((error) => {
          console.warn("后台数据更新失败，继续使用本地数据:", error);
        });
    } catch (error) {
      console.error("初始化过程出错:", error);
    }
  }
}

const store = new Store();
export { store, store as default };