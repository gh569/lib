import { useSignal, route } from "my";
import { copyToClipboard } from "utils/copyToClipboard.js";
import style from "./hs.module.css";
import store from "utils/store.js";

const thisTab = "tab-hs";

export default function Hs() {
  const thisData = useSignal(store.getDataByName(thisTab));
  const refRngTxt = useSignal("");
  const curIndex = useSignal(-1);

  const btnClick = (m, e) => {
    if (curIndex.value >= 0) {
      thisData.value[curIndex.value].selected = false;
    }
    curIndex.value = m.index;
    thisData.value[curIndex.value].selected = true;
    refRngTxt.value = thisData.value[curIndex.value + 1].value
      .replace(/myname/g, store.myname)
      .replace(/mytel/g, store.mytel)
      .replace(/mymail/g, store.mymail)
      .replace(/mycity/g, store.mycity)
      .replace(/\t/g, "  ");

    if (typeof uni != "undefined") {
      uni.setClipboardData({
        data: refRngTxt.value,
        success: (r) => {},
      });
    } else {
      copyToClipboard(refRngTxt.value);
    }
  };

  return (
    <div>
      <div className={style.head}>
        <div className={style.headText}>{store.myname}</div>
        <button
          className={style.headButton}
          onClick={() => route("/about")}
        >
          关于
        </button>
      </div>
      <div className={style.hs}>
        <table><tbody>
          {thisData.value
            .filter((t) => t.grade[0] && !t.grade[1] && !t.grade[2])
            .map((t) => {
              return (
                <tr className={style.tr}>
                  <td className={style.content}>{t.value}</td>
                  <td className={style.item}>
                    {thisData.value
                      .filter(
                        (m) =>
                          m.grade[0] == t.grade[0] && m.grade[1] && !m.grade[2]
                      )
                      .map((m) => (
                        <>
                          <button
                            className={`${style.button} ${
                              m.selected ? "selected" : ""
                            } `}
                            onClick={(e) => btnClick(m, e)}
                          >
                            {m.value}
                          </button>
                        </>
                      ))}
                  </td>
                </tr>
              );
            })}
        </tbody></table>
        <textarea className={style.textarea} value={refRngTxt.value}></textarea>
      </div>
    </div>
  );
}
