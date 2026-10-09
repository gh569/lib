import { useSignal, useEffect } from "my";
import style from "./detail.module.css";
import { copyToClipboard } from "utils/copyToClipboard";
import store from "utils/store.js";
import FixButton from "com/fix-button.jsx";

let refRng;
const XuHao =
  "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";

export default function Copy({tab}) {
  const thisData = useSignal([]);
  const data = store.getDataByName(tab);
  const { init } = data;
  if (!data) {
    return <div>Error...</div>;
  }
  thisData.value = data.thisData.value.filter((v) => v.selected);

  const cpyClick = () => {
    let text = refRng.innerText;
    if (text) {
      copyToClipboard(text);
    }
    init();
    setTimeout(() => history.back(), 100);
  };

  const childData = (v) => {
    const ms = thisData.value.filter(
      (v2) =>
        v.grade[0] == v2.grade[0] && v.grade[1] == v2.grade[1] && v2.grade[2]
    );
    if (!ms.length) return "";
    if(ms.length==1){
      return `： ${ms[0].value}`
    }
    return (
      <ul>
        {ms.map((v2, i2) => (
          <li>
            {XuHao[i2]} {v2.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div
        className={style.copy}
        ref={(e) => {
          refRng = e;
        }}
      >
        <ul>
          {thisData.value
            .filter((v1) => !v1.grade[2])
            .map((v1, i1) => {
              return (
                <>
                  <li key={i1}>
                    {i1 + 1}. {v1.value}
                    {childData(v1)}
                  </li>
                </>
              );
            })}
        </ul>
      </div>
      <FixButton onClick={cpyClick} value="复制" type='1' />
    </>
  );
}
