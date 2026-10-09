
import Other from "../other/other";
import Hs from "./hs/hs";
import Gy from "./gy/gy";
import Liucheng from "./liucheng/liucheng";

const tabs = {
  "tab-hs": { index: 0, text: "话术", comp: Hs },
  "tab-gy": { index: 1, text: "工艺", comp: Gy },
  "tab-pqlc": { index: 2, text: "流程", comp: Liucheng },
  "tab-other": { index: 3, text: "其他", comp: Other },
};

export default tabs