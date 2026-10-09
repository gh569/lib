import { useSignal } from "@preact/signals";
import { copyToClipboard } from "@utils/copy-to-clipboard";
import { replacePlaceholders } from "@utils/replace-placeholders";
import { useTagData } from "@utils/use-tag-data";
import style from "./hs.module.css";
import store from "@utils/store.js";
import { useLocation } from "wouter-preact";
import { resolveAbsolutePath } from "@utils/resolve-absolute-path";
import Loading from "@com/loading";

const thisTab = "hs";

export default function Hs() {
  const thisData = useTagData(thisTab);
  const refRngTxt = useSignal("");
  const curIndex = useSignal(-1);
  const [,route] = useLocation();

  const btnClick = (item) => {
    // 取消之前选中的项
    if (curIndex.value >= 0 && thisData.value[curIndex.value]) {
      thisData.value[curIndex.value].selected = false;
    }
    
    // 设置新的选中项
    curIndex.value = item.index;
    item.selected = true;
    
    // 更新数据状态
    thisData.value = [...thisData.value];

    // 查找下一个项目并设置文本
    const currentIndex = thisData.value.findIndex(dataItem => dataItem.index === item.index);
    const nextItem = thisData.value[currentIndex + 1];
    
    if (nextItem) {
      refRngTxt.value = replacePlaceholders(nextItem.value);
    } else {
      refRngTxt.value = "";
    }

    // 复制文本到剪贴板
    const copyText = refRngTxt.value;
    if (copyText) {
      if (typeof uni !== "undefined") {
        uni.setClipboardData({
          data: copyText,
          success: () => {},
          fail: (error) => console.error('复制失败:', error)
        });
      } else {
        copyToClipboard(copyText);
      }
    }
  };
	
	const goAbout=()=>{
		route(resolveAbsolutePath(`../about`))
	}

  // 提取过滤逻辑
  const getFirstLevelItems = () => 
    thisData.value.filter((item) => item.grade[0] && !item.grade[1] && !item.grade[2]);

  const getSecondLevelItems = (parentItem) =>
    thisData.value.filter((item) => 
      item.grade[0] === parentItem.grade[0] && item.grade[1] && !item.grade[2]
    );
  
  if(!thisData.value  || !thisData.value.length){
    return <Loading />
  }

  return (
    <div>
      <div className={style.head}>
        <div className={style.headText}>{store.myname}</div>
        <button className={style.headButton} onClick={goAbout}>
          关于
        </button>
      </div>
      <div className={style.hs}>
        <table>
          <tbody>
            {getFirstLevelItems().map((firstLevelItem) => (
              <tr key={firstLevelItem.index} className={style.tr}>
                <td className={style.content}>{firstLevelItem.value}</td>
                <td className={style.item}>
                  {getSecondLevelItems(firstLevelItem).map((secondLevelItem) => (
                    <button 
                      key={secondLevelItem.index}
                      className={`${style.button} ${secondLevelItem.selected ? style.selected : ""}`} 
                      onClick={() => btnClick(secondLevelItem)}
                    >
                      {secondLevelItem.value}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <textarea className={style.textarea} value={refRngTxt.value} readOnly />
      </div>
    </div>
  );
}