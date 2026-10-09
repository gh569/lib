// const XuHao = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿";

import { useRef } from "preact/hooks";
import {useSignal,useSignalEffect} from '@preact/signals'
import style from "./step5.module.css";
import { copyToClipboard } from "@utils/copy-to-clipboard";
import dialog from '@utils/dialog'
import { getDataByStep, setDataByStep } from '../helper';
import { useEffect } from 'preact/hooks';

const step = 3;

export default function Copy({ cancelNext}) {
  // 使用 useRef 替代全局变量
  const refRng = useRef(null);
	const selectedData=useSignal([])
	
	useEffect(() => {
		const { checkedValue, contextValue } = getDataByStep(step);
		selectedData.value=checkedValue
	}, []);
	
	
  

  // 提取子数据渲染逻辑
  const renderChildData = (parentItem) => {
    const children = selectedData.value.filter(
      (item) => parentItem.grade[0] === item.grade[0] && parentItem.grade[1] === item.grade[1] && item.grade[2]
    );

    if (children.length === 0) return null;

    if (children.length === 1) {
      return <span>： {children[0].value}</span>;
    }

    return (<>
      <ul>
        {children.map((child, index) => (
          <li key={child.id || index}>
            {index + 1}) {child.value}
          </li>
        ))}
      </ul>
    </>);
  };

  // 过滤顶层数据
  const topLevelData = selectedData.value.filter((item) => !item.grade[2]);

  return (
    <><h1>四、后续施工注意事项</h1>
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
    </>
  );
}
