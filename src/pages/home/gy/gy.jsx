import { useSignal, route } from "my";
import style from "./gy.module.css";
import store from "utils/store.js";
import FixButton from "com/fix-button.jsx";

const thisTab = "tab-gy";

function Gy() {
  const {thisData, current, contentIndex} = store.getDataByName(thisTab);
  
  const itemClick = (t) => {
    t.selected = !t.selected;
    if (!t.selected) {
      thisData.value.forEach((v) => {
        if (v.grade[0] == t.grade[0] && v.grade[1] == t.grade[1]) {
          v.selected = false;
        }
      });
      thisData.value=[...thisData.value]
      return;
    }
    const ms = thisData.value.filter(
      (v) => v.grade[0] == t.grade[0] && v.grade[1] == t.grade[1] && v.grade[2] 
    )
    if (ms.length && t.selected) {
      current.value=t
      route("/detail?tab=tab-gy");
    }
		thisData.value=[...thisData.value]
  };

  const cpyClick = () => {
    route("/copy?tab=tab-gy");
  };

  return (
    <div className={style.main}>
      <div className={style.content}>
        {thisData.value
          .filter((t) => t.grade[0] && !t.grade[1])
          .map((t) => {
            return (
              <div
                className={
                  t.grade[0] == contentIndex.value
                    ? `${style.contentItem} selected`
                    : style.contentItem
                }
                onClick={(e) => {
                  contentIndex.value = t.grade[0];
                }}
              >
                {t.value}
              </div>
            );
          })}
      </div>
      <div className={style.text}>
        {thisData.value
          .filter(
            (t) => t.grade[0] == contentIndex.value && !t.grade[2] && t.grade[1]
          )
          .map((t) => {
            return (
              <div className={style.textItem} onClick={() => itemClick(t)}>
                <input type="checkbox" checked={t.selected ? true : false} />
                {t.value}
              </div>
            );
          })}
      </div>
      <FixButton onClick={cpyClick} value="复制" />
    </div>
  );
}
export default Gy;
