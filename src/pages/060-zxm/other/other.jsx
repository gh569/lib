import style from "./other.module.css";
import { useLocation } from "wouter-preact";
import { resolveAbsolutePath } from "@utils/resolve-absolute-path";

// 使用对象数组替代二维数组，提高数据可读性
const contents = [
  { name: "话术", path: "/hs", isNewWindow: false },
  { name: "提示", path: "/ts", isNewWindow: false },
  { name: "节点", path: "/jiedian", isNewWindow: false },
  { name: "工艺", path: "/gy", isNewWindow: false },
  { name: "工艺2", path: "/gy2", isNewWindow: false },
  { name: "交底", path: "/images", isNewWindow: false },
  { name: "审核", path: "/check", isNewWindow: false },
  { name: "陪签工作", path: "/work", isNewWindow: false },
  { name: "陪签流程", path: "/liucheng", isNewWindow: false },
  { name: "日志总结", path: "/zj", isNewWindow: false },
];

// 提取公共组件结构，减少重复代码
function MenuItem({ name, path, isNewWindow }) {
  const [, route] = useLocation();
  const handleClick = () => {
    if (isNewWindow) {
      window.open(path, "_blank");
    } else {
      route(resolveAbsolutePath(`./060-zxm${path}`));
    }
  };

  return (
    <div className={style.item} onClick={handleClick}>
      <div className={style.itemContent}>{name}</div>
      <div className={style.itemRight}>{">"}</div>
    </div>
  );
}

export default function Other() {
  // 移除不必要的 useSignal，直接使用 contents 数组
  return (
    <div className={style.body}>
      <div className={style.head}>首页</div>
      {/* 渲染菜单项 */}
      {contents.map((item) => (
        <MenuItem key={item.path} {...item} />
      ))}
    </div>
  );
}