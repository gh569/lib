import store from "@utils/store";
import Other from "../../other";
import Pqhs from "../../work/hs";
import Pqjy from "../../work/ht";
import Pqgz from "../../work";
import { signal } from "@preact/signals";

const tabIndex = signal(0);

// 定义所有可用的标签页
const allTabs = {
	"pqjy": { index: 0, text: "建议", comp: Pqjy },
	"pqhs": { index: 1, text: "话术", comp: Pqhs },
	"pq": { index: 2, text: "陪签", comp: Pqgz },
	"other": { index: 3, text: "其他", comp: Other },
};

// 根据用户权限过滤标签页
const getAvailableTabs = () => {
	return allTabs;
};

export { tabIndex, getAvailableTabs };