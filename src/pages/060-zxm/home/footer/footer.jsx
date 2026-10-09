import style from "./footer.module.css";
import { tabIndex, getAvailableTabs } from "./tabs";

// 组件名遵循 PascalCase 规范
export default function Footer({ swiper }) {
  // 提前获取当前选中的 tab 索引，避免在循环中重复访问 store
  const tabs = getAvailableTabs();
  const currentTabIndex = tabIndex.value;

  return (
    <div className={style.main}>
      {/* 使用 Object.values 直接获取值，避免先获取键再取值 */}
      {Object.values(tabs).map((tab) => (
        <div
          // 使用 React 推荐的 key 属性，优化列表渲染性能
          key={tab.index}
          // 使用严格相等比较
          className={tab.index === currentTabIndex ? style.current : style.item}
          onClick={() => {
            swiper.current?.swipeTo(tab.index, true);
          }}
        >
          {tab.text}
        </div>
      ))}
    </div>
  );
}