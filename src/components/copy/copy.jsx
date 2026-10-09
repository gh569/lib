// const XuHao = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";

import { useRef } from "preact/hooks";
import { copyToClipboard } from "@utils/copy-to-clipboard";
import FixButton from "@com/fix-button";
import dialog from '@utils/dialog'
import style from "./copy.module.css";

export default function Copy({ selectedData, onAfterCopy }) {
  // 使用 useRef 替代全局变量
  const refRng = useRef(null);

  const cpyClick = () => {
    const text = refRng.current?.innerText;
    if (text) {
      copyToClipboard(text);
    }
    if (onAfterCopy) {
      onAfterCopy();
    }
    // setTimeout(() => history.back(), 100);
    dialog.close();
  };

  // 提取子数据渲染逻辑
  const renderChildData = (parentItem) => {
    const children = selectedData.value.filter(
      (item) => parentItem.grade[0] === item.grade[0] && parentItem.grade[1] === item.grade[1] && item.grade[2]
    );

    if (children.length === 0) return null;

    if (children.length === 1) {
      return <span>： {children[0].value}</span>;
    }

    return (
      <ul>
        {children.map((child, index) => (
          <li key={child.id || index}>
            {index + 1}) {child.value}
          </li>
        ))}
      </ul>
    );
  };

  // 过滤顶层数据
  const topLevelData = selectedData.value.filter((item) => !item.grade[2]);

  return (
    <>
      <div className={style.copy} ref={refRng}>
        <ul>
          {topLevelData.map((item, index) => (
            <li key={item.id || index}>
              {index + 1}. {item.value}
              {renderChildData(item)}
            </li>
          ))}
        </ul>
      </div>
      <FixButton onClick={cpyClick}>❏</FixButton>
    </>
  );
}
