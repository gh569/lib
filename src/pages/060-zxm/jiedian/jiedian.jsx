import FixButton from "@com/fix-button";
import style from "./jiedian.module.css";
import { useLocation } from "wouter-preact";
import dialog from '@utils/dialog'
import Copy from "@com/copy";
// 提取公共比较函数，提高代码复用性
const isSameGradeLevel0And1 = (a, b) => {
  return a.grade[0] === b.grade[0] && a.grade[1] === b.grade[1];
};

export default function Jiandian({ thisData, contentIndex, selectedData,init }) {
  const [,route]=useLocation()
  const itemClick = (item) => {
    // 切换选中状态
    item.selected = !item.selected;
    
    // 如果是选中操作，取消同组其他三级项目的选中状态
    if (item.selected && item.grade[2]) {
      thisData.value = thisData.value.map(v => {
        if (isSameGradeLevel0And1(v, item) && v.grade[2] && v.index !== item.index) {
          return { ...v, selected: false };
        }
        return v;
      });
    } else {
      // 触发重新渲染
      thisData.value = [...thisData.value];
    }
  };

  const updateContentIndex = (newIndex) => {
    contentIndex.value = newIndex;
  };

  const cpyClick = () => {
    // 确保父级项目也被选中
    const updatedData = thisData.value.map(item => {
      if (item.selected && !item.grade[2]) {
        return item;
      }
      
      if (item.selected && item.grade[2]) {
        // 找到对应的父级项目并选中它
        const parentIndex = thisData.value.findIndex(
          v => isSameGradeLevel0And1(v, item) && !v.grade[2]
        );
        if (parentIndex > -1) {
          return item;
        }
      }
      return item;
    });
    
    // 再次遍历确保父级被选中
    const finalData = updatedData.map(item => {
      if (!item.grade[2] && updatedData.some(v => 
        isSameGradeLevel0And1(v, item) && v.grade[2] && v.selected
      )) {
        return { ...item, selected: true };
      }
      return item;
    });
    
    thisData.value = finalData;
    selectedData.value = finalData.filter(item => item.selected);
    dialog.show(<Copy selectedData={selectedData} onAfterCopy={init} />)
  };

  // 过滤一级菜单项
  const firstLevelItems = thisData.value.filter(item => item.grade[0] && !item.grade[1]);
  
  // 过滤当前选中的二级项
  const secondLevelItems = thisData.value.filter(
    item => item.grade[0] === contentIndex.value && item.grade[1]
  );

  return (
    <div>
      {/* 菜单栏 */}
      <div className={style.content}>
        {firstLevelItems.map(item => (
          <div
            key={item.index}
            className={
              item.grade[0] === contentIndex.value 
                ? `${style.contentItem} ${style.selected}` 
                : style.contentItem
            }
            onClick={() => updateContentIndex(item.grade[0])}
          >
            {item.value}
          </div>
        ))}
      </div>
      
      {/* 文本栏 */}
      <div className={style.text}>
        {secondLevelItems.map(item => {
          if (!item.grade[2]) {
            return (
              <div key={item.index} className={style.textTitle}>
                {"---"}{item.value}
              </div>
            );
          }
          return (
            <div 
              key={item.index} 
              className={style.textItem} 
              onClick={() => itemClick(item)}
            >
              <input 
                type="checkbox" 
                checked={item.selected || false} 
                readOnly
              />
              {item.value}
            </div>
          );
        })}
      </div>
      
      <FixButton onClick={cpyClick}>❏</FixButton>
    </div>
  );
}