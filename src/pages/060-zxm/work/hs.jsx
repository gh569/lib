import { useSignal } from "@preact/signals";
import { copyToClipboard } from "@utils/copy-to-clipboard";
import { replacePlaceholders } from "@utils/replace-placeholders";
import { useTagData } from "@utils/use-tag-data";
import style from "./hs.module.css";
import store from "@utils/store.js";
import { useLocation } from "wouter-preact";
import { resolveAbsolutePath } from "@utils/resolve-absolute-path";
import Loading from "@com/loading";

const THIS_TAB = 'pqgz';
const contentIndex = 1;

export default function Hs() {
  const thisData = useTagData(THIS_TAB, {
    transform: (data) => data.filter((item) => item.grade[0] === contentIndex),
  });
  const refRngTxt = useSignal("");
  const curIndex = useSignal(-1);
  const [, route] = useLocation();

  const btnClick = (item, e) => {
    // 1. 更新选中状态
    if (curIndex.value >= 0) {
      const prevItem = thisData.value.find(i => i.index === curIndex.value);
      if (prevItem) prevItem.selected = false;
    }
    item.selected = true;
    curIndex.value = item.index;
    thisData.value = [...thisData.value]; // 触发视图更新

    // 2. 查找下一个项目并设置文本
    const currentIndex = thisData.value.findIndex(dataItem => dataItem.index === item.index);
    const nextItem = thisData.value[currentIndex + 1];
    const copyText = nextItem ? replacePlaceholders(nextItem.value) : "";

    refRngTxt.value = copyText;

    // 3. 复制到剪贴板
    if (copyText) {
      if (typeof uni !== "undefined") {
        uni.setClipboardData({ data: copyText, success: () => {}, fail: console.error });
      } else {
        copyToClipboard(copyText);
      }
      
      
    }
  };

  const goAbout = () => route(resolveAbsolutePath(`./about`));

  const getFirstLevelItems = () => 
    thisData.value.filter(item => item.grade[0] && !item.grade[1] && !item.grade[2]);

  const getSecondLevelItems = (parentItem) =>
    thisData.value.filter(item => 
      item.grade[0] === parentItem.grade[0] && item.grade[1] && !item.grade[2]
    );

  if (!thisData.value || !thisData.value.length) {
    return <Loading />;
  }

  return (
    <div className={style.wrapper}>
      {/* 顶部导航栏 */}
      <header className={style.header}>
        <div className={style.userName}>{store.myname}</div>
        <button className={style.aboutBtn} onClick={goAbout}>关于</button>
      </header>

      {/* 主内容区：按钮列表 + 预览框，全部在正常文档流中 */}
      <main className={style.main}>
        {getFirstLevelItems().map(firstLevelItem => (
          <section key={firstLevelItem.index} className={style.category}>
            <div className={style.categoryTitle}>{firstLevelItem.value}</div>
            <div className={style.buttonGroup}>
              {getSecondLevelItems(firstLevelItem).map(secondLevelItem => (
                <button 
                  key={secondLevelItem.index}
                  className={`${style.actionBtn} ${secondLevelItem.selected ? style.active : ""}`} 
                  onClick={(e) => btnClick(secondLevelItem, e)}
                >
                  {secondLevelItem.value}
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* 预览文本区域：不再是 fixed 或绝对底部，而是跟随在按钮下方 */}
        {refRngTxt.value && (
          <div className={style.previewBox}>
            <div className={style.previewLabel}>复制内容预览</div>
            <textarea 
              className={style.textarea} 
              value={refRngTxt.value} 
              readOnly 
            />
          </div>
        )}
      </main>
      
      {/* 这里可以继续写你底部的其他内容，会自然排在 main 下面 */}
    </div>
  );
}
